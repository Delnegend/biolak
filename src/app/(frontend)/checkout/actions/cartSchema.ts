import z from 'zod/v4'

export const cartSchema = z.array(
	z.object({
		product: z.number().int(),
		sku: z.string(),
		quantity: z.number().int().min(1),
	}),
)
