'use server'

import { z } from 'zod'

const SendReviewSchema = z.object({
	invoiceId: z.string(),
	rating: z.number().min(1, 'Rating is required').max(5, 'Rating is too long'),
	content: z.string().min(1, 'Content is required').max(1000, 'Content is too long'),
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
	try {
		const parsedInput = SendReviewSchema.parse(input)

		// Process the validated data here
		console.log('Form submission:', parsedInput)

		return { success: true }
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Return validation errors to be displayed in the UI
			return { success: false, error: error.message }
		}

		// Handle other types of errors
		console.error('Unexpected error during form submission:', error)
		throw error
	}
}
