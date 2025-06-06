'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { OrdersSlug } from '@/collections/Orders/slug'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

const SendReviewSchema = z.object({
	invoiceId: z.string(),
	rating: z.number().min(1, 'Rating is required').max(5, 'Rating is too long'),
	content: z.string().min(0, 'Content is required').max(1000, 'Content is too long'),
	images: z.array(
		z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
			message: 'File size must be less than 5MB',
		}),
	),
})

export type SendReviewInputType = z.infer<typeof SendReviewSchema>

export async function sendReviewAction(input: unknown): Promise<
	| {
			success: true
	  }
	| {
			success: false
			error: string
	  }
> {
	const {
		ok: parsedInputOk,
		data: parsedInput,
		error: parsedInputError,
	} = tryCatchSync(() => SendReviewSchema.parse(input))
	if (!parsedInputOk) {
		return {
			success: false,
			error:
				parsedInputError instanceof z.ZodError
					? parsedInputError.message
					: `${parsedInputError}`,
		}
	}

	const payload = await getPayload({ config })
	const { ok: updateOk, error: updateError } = await tryCatch(() =>
		payload.update({
			collection: OrdersSlug,
			id: parsedInput.invoiceId,
			data: {
				review: {
					...parsedInput,
					approved: false,
				},
			},
			overrideAccess: true,
		}),
	)
	if (!updateOk) {
		return {
			success: false,
			error: updateError instanceof Error ? updateError.message : `${updateError}`,
		}
	}

	return { success: true }
}
