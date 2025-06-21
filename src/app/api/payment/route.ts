import { z } from 'zod/v4'

import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

const IncomingRequestSchema = z.object({
	id: z.number().int().positive(),
	gateway: z.string().min(1),
	transactionDate: z.date(),
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

type OutgoingResponse =
	| {
			success: true
	  }
	| {
			success: false
			message: string
	  }

export async function POST(req: Request): Promise<Response> {
	const { data: body, ok: bodyOk, error: bodyError } = await tryCatch(() => req.json())
	if (!bodyOk) {
		console.error('Error parsing request body:', bodyError)
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Invalid request body',
			} satisfies OutgoingResponse),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}

	const {
		ok: parsedBodyOk,
		data: parsedBody,
		error: parsedBodyError,
	} = tryCatchSync(() => IncomingRequestSchema.parse(body))
	if (!parsedBodyOk) {
		console.error('Error parsing request body:', parsedBodyError)
		return new Response(
			JSON.stringify({
				success: false,
				message: `Invalid request body: ${z.prettifyError(parsedBodyError as z.ZodError)}`,
			} satisfies OutgoingResponse),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}

	console.log('Parsed request body:', parsedBody)

	return new Response(
		JSON.stringify({
			success: true,
		} satisfies OutgoingResponse),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	)
}
