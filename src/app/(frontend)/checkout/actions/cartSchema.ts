import z from 'zod/v4'

export const cartSchema = z.array(
	z.object({
		productId: z.number().int(),
		productSku: z.string(),
		quantity: z.number().int().min(1),
	}),
)
