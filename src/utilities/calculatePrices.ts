import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { DiscountCode, Product, ProductCategory, ProductSubCategory } from '@/payload-types'

function clamp({ min, max, value }: { min: number; max: number; value: number }): number {
	return Math.min(Math.max(value, min), max)
}

export function calculatePrices({
	code,
	shipping: shipping_,
	products,
}: {
	code?: {
		allProducts?: boolean | null
		applicableCategories?:
			| (
					| {
							relationTo: typeof ProductCategoriesSlug
							value: number | { id: ProductCategory['id'] }
					  }
					| {
							relationTo: typeof ProductSubCategoriesSlug
							value: number | { id: ProductSubCategory['id'] }
					  }
			  )[]
			| null
			| undefined
		applicableProducts?:
			| (
					| number
					| {
							id: Product['id']
					  }
			  )[]
			| null
			| undefined
		discountType: DiscountCode['discountType']
		value: DiscountCode['value']
		maxDiscount?: DiscountCode['maxDiscount']
	} | null
	shipping: number
	products: Array<{
		id: Product['id']
		categoryIds?: number[]
		subCategoryIds?: number[]
		variant: {
			price: Product['variants'][number]['price']
			quantity: number
		}
	}>
}): {
	provisional: number
	discount: number
	shipping: number
	total: number
} {
	const shipping = Math.max(0, shipping_)
	const maxDiscount = code?.maxDiscount ?? Infinity

	if (!products)
		return {
			provisional: 0,
			discount: 0,
			shipping,
			total: shipping,
		}

	const provisional = products.reduce((acc, product) => {
		const variantPrice = product.variant.price * product.variant.quantity
		return acc + variantPrice
	}, 0)

	if (!code) {
		return {
			provisional,
			discount: 0,
			shipping,
			total: Math.max(0, provisional + shipping),
		}
	}

	if (code.allProducts) {
		const discount = clamp({
			min: 0,
			value: code.discountType === 'fixed' ? code.value : (provisional * code.value) / 100,
			max: maxDiscount,
		})
		return {
			provisional,
			discount,
			shipping,
			total: Math.max(0, provisional - discount + shipping),
		}
	}

	const productsToBeDiscounted = new Set<Product['id']>()
	{
		const applicableProductIds =
			code.applicableProducts?.filter((p) => (typeof p === 'number' ? p : p.id)) ?? []
		const applicableCategoryIds =
			code.applicableCategories?.map((c) =>
				typeof c.value === 'number' ? c.value : c.value.id,
			) ?? []
		for (const product of products) {
			if (
				applicableProductIds.includes(product.id) ||
				applicableCategoryIds.some((id) => product.categoryIds?.includes(id)) ||
				applicableCategoryIds.some((id) => product.subCategoryIds?.includes(id))
			) {
				productsToBeDiscounted.add(product.id)
			}
		}
	}

	const discountableTotal = products.reduce((acc, product) => {
		if (productsToBeDiscounted.has(product.id)) {
			const variantPrice = product.variant.price * product.variant.quantity
			return acc + variantPrice
		}
		return acc
	}, 0)

	const discount = clamp({
		min: 0,
		max: code.discountType === 'fixed' ? code.value : (discountableTotal * code.value) / 100,
		value: maxDiscount,
	})

	return {
		provisional,
		discount,
		shipping,
		total: Math.max(0, provisional - discount + shipping),
	}
}
