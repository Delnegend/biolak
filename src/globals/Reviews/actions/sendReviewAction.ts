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
	const parsed = tryCatchSync(() => SendReviewSchema.parse(input))
	if (!parsed.success) {
		return {
			success: false,
			error: parsed.error instanceof z.ZodError ? parsed.error.message : `${parsed.error}`,
		}
	}

	const payload = await getPayload({ config })
	const result = await tryCatch(() =>
		payload.update({
			collection: OrdersSlug,
			id: parsed.data.invoiceId,
			data: {
				review: {
					...parsed.data,
					approved: false,
				},
			},
			overrideAccess: true,
		}),
	)
	if (!result.success) {
		return {
			success: false,
			error: result.error instanceof Error ? result.error.message : `${result.error}`,
		}
	}

	return { success: true }
}
