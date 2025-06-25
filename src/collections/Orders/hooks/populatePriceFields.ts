import { CollectionAfterReadHook } from 'payload'

import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalDefaults } from '@/globals/CheckoutPage/defaults'
import { Order } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'

const cnsole = cnsoleBuilder('Orders/populatePriceFields')

export const populatePriceFields: CollectionAfterReadHook<Order> = async ({
	doc,
	req: { payload },
}) => {
	if (!doc.cart?.products) return doc

	const {
		data: productsInfos,
		ok: productsInfosOk,
		error: productsInfosError,
	} = await arrayDepthHandler({
		data: doc.cart.products.map((item) => item.product),
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
		cnsole.error("Can't fetch products:", productsInfosError)
		return doc
	}

	const products = doc.cart?.products
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
			}
		})
		.filter((item) => item !== null)

	if (!products) {
		cnsole.error("Either 'cart' or 'products' is not defined", 'orderId', doc.id)
	}

	const {
		data: code,
		ok: codeOk,
		error: codeError,
	} = await depthHandler({
		data: doc.cart?.discountCode,
		fetch(id) {
			return payload.findByID({
				collection: DiscountCodesSlug,
				id,
			})
		},
	})
	if (!codeOk) {
		cnsole.error("Can't fetch discount code:", codeError)
	}

	// fill final prices
	if (doc.cart)
		doc.cart.prices = calculatePrices({
			code,
			shipping:
				doc.shippingInfo?.method === 'express'
					? CheckoutPageGlobalDefaults.shipping.fastShippingPrice
					: CheckoutPageGlobalDefaults.shipping.standardShippingPrice,
			products: products,
		})

	// fill individual product prices
	for (const product of doc.cart?.products ?? []) {
		const matchedProduct = productsInfos.find(
			(p) =>
				p.id === (typeof product.product === 'object' ? product.product.id : product.product),
		)
		const matchedVariant = matchedProduct?.variants.find((v) => v.sku === product.sku)
		if (!matchedVariant) continue

		product.previewPrice = matchedVariant.price
		product.previewTotal = matchedVariant.price * product.quantity
	}

	return doc
}
