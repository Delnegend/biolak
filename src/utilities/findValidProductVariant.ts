import { Product } from '@/payload-types'

/**
 * Returns the first in-stock default variant of a product, or the first in-stock variant if no default exists.
 */
export function findValidProductVariant(
	variants?: Product['variants'] | null,
): Product['variants'][number] | null {
	if (!variants || variants.length === 0) return null

	// Find the first variant that is in stock
	const inStockVariant = variants.find((variant) => variant.stock > 0)

	// If no in-stock variant is found, return null
	if (!inStockVariant) return null

	// Return the first default variant if it exists, otherwise return the first in-stock variant
	return inStockVariant.defaultVariant ? inStockVariant : (variants[0] ?? null)
}
