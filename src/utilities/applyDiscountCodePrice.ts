import { DiscountCode, Product } from '@/payload-types'

export function applyDiscountCodePrice({
	code,
	shipping: shipping_,
	products,
}: {
	code?: DiscountCode
	shipping: number
	products: Array<{
		id: Product['id']
		category: Product['productCategories']
		subCategory: Product['productSubCategories']
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

	if (!code || !products || products.length === 0)
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

	if (code.allProducts) {
		const discount = Math.max(
			0,
			code.discountType === 'fixed' ? code.value : (provisional * code.value) / 100,
		)
		return {
			provisional,
			discount,
			shipping,
			total: Math.max(0, provisional - discount + shipping),
		}
	}

	const productsToBeDiscounted = new Set<Product['id']>()
	const applicableProductIds =
		code.applicableProducts?.filter((p) => typeof p === 'object').map((product) => product.id) ??
		[]
	const applicableCategoryIds =
		code.applicableCategories
			?.map((c) => c.value)
			.filter((c) => typeof c === 'object')
			.map((c) => c.id) ?? []

	for (const product of products) {
		const categoryIds =
			product.category?.filter((c) => typeof c === 'object').map((c) => c.id) ?? []
		const subCategoryIds =
			product.subCategory?.filter((c) => typeof c === 'object').map((c) => c.id) ?? []
		if (
			applicableProductIds.includes(product.id) ||
			applicableCategoryIds.some((id) => categoryIds.includes(id)) ||
			applicableCategoryIds.some((id) => subCategoryIds.includes(id))
		) {
			productsToBeDiscounted.add(product.id)
		}
	}

	const discountableTotal = products.reduce((acc, product) => {
		if (productsToBeDiscounted.has(product.id)) {
			const variantPrice = product.variant.price * product.variant.quantity
			return acc + variantPrice
		}
		return acc
	}, 0)

	const discount = Math.max(
		0,
		code.discountType === 'fixed' ? code.value : (discountableTotal * code.value) / 100,
	)

	return {
		provisional,
		discount,
		shipping,
		total: Math.max(0, provisional - discount + shipping),
	}
}
