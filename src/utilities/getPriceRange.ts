import { Product } from '@/payload-types'

import { formatPrice } from './formatPrice'

type ProductVariant = NonNullable<Product>['variants'][number]

/** Return null if out of stock, otherwise return a string representing the price range of the product. */
export function getPriceRange(p: {
	variants: {
		price: ProductVariant['price']
		stock: ProductVariant['stock']
	}[]
}): string | null {
	if (!p.variants) return null

	const availableVariants = p.variants.filter((variant) => variant.stock > 0)
	if (availableVariants.length === 0) return null

	const lowest = Math.min(...availableVariants.map((variant) => variant.price))
	const highest = Math.max(...availableVariants.map((variant) => variant.price))
	if (lowest === highest) return formatPrice(lowest)

	return `${formatPrice(lowest)} - ${formatPrice(highest)}`
}
