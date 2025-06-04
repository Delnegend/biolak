'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { ContactFormSubmissionsSlug } from '@/collections/ContactFormSubmissions/slug'

const ContactFormInputSchema = z.object({
	username: z.string().min(1).max(100),
	email: z.string().email(),
	phoneNumber: z.string().min(1).max(11),
	message: z.string().min(1).max(1000),
})

export type ContactFormInputType = z.infer<typeof ContactFormInputSchema>

export async function submitContactFormAction(input: unknown): Promise<{
	success: boolean
	errors?: z.ZodError | unknown
}> {
	try {
		const data = ContactFormInputSchema.parse(input)
		const payload = await getPayload({ config })

		payload.create({
			collection: ContactFormSubmissionsSlug,
			data,
		})

		return { success: true }
	} catch (e) {
		if (e instanceof z.ZodError) {
			return {
				success: false,
				errors: e,
			}
		}
		return {
			success: false,
			errors: `Unknown error: ${e}`,
		}
	}
}
