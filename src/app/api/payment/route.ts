import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { OrdersSlug } from '@/collections/Orders/slug'
import { PaymentGlobalSlug } from '@/globals/Payment/slug'
import { PaymentGlobal } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

const cnsole = cnsoleBuilder('Payment API')

const IncomingRequestSchema = z.object({
	id: z.number().int().positive(),
	gateway: z.string().min(1),
	transactionDate: z.string(),
	accountNumber: z.string().min(1),
	code: z.string().nullable(),
	content: z.string().min(1),
	transferType: z.enum(['in', 'out']),
	transferAmount: z.number().int().positive(),
	accumulated: z.number().int().positive(),
	subAccount: z.string().nullable(),
	referenceCode: z.string().min(1),
	description: z.string().optional().default(''),
})

const SUCCESS = new Response(
	JSON.stringify({
		success: true,
	}),
	{
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	},
)

const ERROR = (message: string) =>
	new Response(
		JSON.stringify({
			success: false,
			message,
		} satisfies OutgoingResponse),
		{
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		},
	)

type OutgoingResponse =
	| {
			success: true
	  }
	| {
			success: false
			message: string
	  }

export async function POST(req: Request): Promise<Response> {
	const [
		{ data: paymentGlobal, ok: paymentGlobalOk, error: paymentGlobalError },
		{ data: payload, ok: payloadOk, error: payloadError },
	] = await Promise.all([
		tryCatch(() => getCachedGlobal<PaymentGlobal>(PaymentGlobalSlug, 1, Lang.Vietnamese)()),
		tryCatch(() => getPayload({ config })),
	])
	if (!payloadOk) {
		cnsole.error('Error getting Payload instance:', payloadError)
		return ERROR('Internal server error')
	}
	if (!paymentGlobalOk || !paymentGlobal.sepayApiKey) {
		cnsole.error('Error getting payment global:', paymentGlobalError)
		return ERROR("Can't get internal Sepay API key")
	}

	const incomingSepayApiKey = req.headers.get('Authorization')?.replace('Apikey ', '')
	if (!incomingSepayApiKey || incomingSepayApiKey !== paymentGlobal.sepayApiKey) {
		cnsole.error('Invalid or missing Sepay API key in request headers.')
		return ERROR('Invalid Sepay API key')
	}

	const { data: body, ok: bodyOk, error: bodyError } = await tryCatch(() => req.json())
	if (!bodyOk) {
		cnsole.error('Error parsing request body:', bodyError)
		return ERROR('Invalid request body')
	}

	const {
		ok: parsedBodyOk,
		data: parsedBody,
		error: parsedBodyError,
	} = tryCatchSync(() => IncomingRequestSchema.parse(body))
	if (!parsedBodyOk) {
		cnsole.error(
			'Error parsing request body:',
			z.prettifyError(parsedBodyError as z.ZodError),
			body,
		)
		return ERROR(
			`Invalid request body: ${parsedBodyError instanceof z.ZodError ? z.prettifyError(parsedBodyError) : parsedBodyError}`,
		)
	}

	cnsole.debug('Parsed request body:', parsedBody)

	if (parsedBody.transferType === 'out') {
		cnsole.log('Transfer type is "out", skipping processing.')
		return SUCCESS
	}

	const match = parsedBody.content.match(/blck-([A-Za-z0-9-_]{21})/)
	if (!match) {
		cnsole.log('Content does not contain a valid "blck-XXX" order ID, skipping processing.')
		return SUCCESS
	}

	const orderId = match[1]
	cnsole.debug('Extracted order ID from content:', orderId)
	if (!orderId) {
		cnsole.error('Order ID not found in content:', parsedBody.content)
		return SUCCESS
	}

	cnsole.debug('Extracted order ID:', orderId)

	const {
		data: order,
		ok: orderOk,
		error: orderError,
	} = await tryCatch(() =>
		payload.find({
			collection: OrdersSlug,
			where: {
				invoiceId: {
					equals: orderId,
				},
			},
			pagination: false,
			limit: 1,
			overrideAccess: true,
		}),
	)
	if (!orderOk) {
		cnsole.error('Error fetching order:', orderError)
		return ERROR('Order not found')
	}
	if (!order.docs[0]) {
		cnsole.error('Order not found:', orderId)
		return SUCCESS
	}

	const { ok: updateOk, error: updateError } = await tryCatch(() => {
		if (!order.docs[0]?.id) throw new Error('Order ID is missing')

		return payload.update({
			collection: OrdersSlug,
			id: order.docs[0]?.id,
			data: {
				billing: {
					transactions: [
						...(order.docs[0].billing?.transactions || []),
						{
							id: parsedBody.id.toString(),
							transactionDate: parsedBody.transactionDate,
							code: parsedBody.code,
							content: parsedBody.content,
							referenceCode: parsedBody.referenceCode,
							transferAmount: parsedBody.transferAmount,
							description: parsedBody.description,
						},
					],
				},
			},
			overrideAccess: true,
		})
	})
	if (!updateOk) {
		cnsole.error('Error updating order:', updateError)
	}

	return SUCCESS
}
