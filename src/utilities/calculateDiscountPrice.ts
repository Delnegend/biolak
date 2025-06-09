import { DiscountCode } from '@/payload-types'

interface CartPrices {
	provisional: number
	discount: number
	shipping: number
	total: number
}

export function calculateCartPrice({ code }: { code: DiscountCode | null }): CartPrices {
	const prices: CartPrices = {
		provisional: 0,
		discount: 0,
		shipping: 0,
		total: 0,
	}

	if (code) {
		// Apply discount code logic here
	}

	return prices
}
