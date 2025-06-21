import { CollectionAfterReadHook } from 'payload'

import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalDefaults } from '@/globals/CheckoutPage/defaults'
import { Order } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'

export const populateVirtualFields: CollectionAfterReadHook<Order> = async ({
	doc,
	req: { payload },
}) => {
	const typedData = doc as Partial<Order>
	if (!typedData.cart?.products) return typedData

	const {
		data: productsInfos,
		ok: productsInfosOk,
		error: productsInfosError,
	} = await arrayDepthHandler({
		data: typedData.cart.products.map((item) => item.product),
		fetch: (ids) =>
			payload
				.find({
					collection: ProductsSlug,
					where: {
						id: {
							in: ids,
						},
					},
					select: {
						id: true,
						variants: true,
						productCategories: true,
						productSubCategories: true,
					},
					depth: 1,
					pagination: false,
					limit: 1000,
				})
				.then((result) => result.docs),
	})
	if (!productsInfosOk) {
		console.error("[Orders/After read] Can't fetch products:", productsInfosError)
		return typedData
	}

	const products = typedData.cart?.products
		.map((cartItem) => {
			const matchedProduct = productsInfos.find(
				(p) =>
					p.id ===
					(typeof cartItem.product === 'object' ? cartItem.product.id : cartItem.product),
			)
			if (!matchedProduct) return null
			const matchedVariant = matchedProduct.variants.find((v) => v.sku === cartItem.sku)
			if (!matchedVariant) return null
			return {
				id: matchedProduct.id,
				variant: {
					price: matchedVariant.price,
					quantity: cartItem.quantity,
				},
				categoryIds: matchedProduct.productCategories?.map((c) =>
					typeof c === 'object' ? c.id : c,
				),
				subCategoryIds: matchedProduct.productSubCategories?.map((c) =>
					typeof c === 'object' ? c.id : c,
				),
			} satisfies Parameters<typeof calculatePrices>[0]['products'][number]
		})
		.filter((item) => item !== null)

	if (!products) {
		console.error(
			"[Orders/After read] Either 'cart' or 'products' is not defined",
			'orderId',
			typedData.id,
		)
	}

	const {
		data: code,
		ok: codeOk,
		error: codeError,
	} = await depthHandler({
		data: typedData.cart?.discountCode,
		fetch(id) {
			return payload.findByID({
				collection: DiscountCodesSlug,
				id,
			})
		},
	})
	if (!codeOk) {
		console.error("[Orders/After read] Can't fetch discount code:", codeError)
	}

	// fill final prices
	if (typedData.cart)
		typedData.cart.prices = calculatePrices({
			code,
			shipping:
				typedData.shippingInfo?.method === 'express'
					? CheckoutPageGlobalDefaults.shipping.fastShippingPrice
					: CheckoutPageGlobalDefaults.shipping.standardShippingPrice,
			products: products,
		})

	// fill individual product prices
	for (const product of typedData.cart?.products ?? []) {
		const matchedVariant = productsInfos
			.find(
				(p) =>
					p.id ===
					(typeof product.product === 'object' ? product.product.id : product.product),
			)
			?.variants.find((v) => v.sku === product.sku)
		if (!matchedVariant) continue

		product.previewPrice = matchedVariant.price
		product.previewTotal = matchedVariant.price * product.quantity
	}

	return typedData
}
