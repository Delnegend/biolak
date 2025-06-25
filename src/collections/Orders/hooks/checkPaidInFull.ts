import { CollectionBeforeChangeHook } from 'payload'

import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobal, Order } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'

const cnsole = cnsoleBuilder('Orders/checkPaidInFull')

export const checkPaidInFull: CollectionBeforeChangeHook<Order> = async ({
	data,
	operation,
	req,
}) => {
	if (operation !== 'update') return data
	if (data.billing?.method !== 'bankTransfer') return data

	const {
		data: code,
		ok: codeOk,
		error: codeError,
	} = await depthHandler({
		data: data.cart?.discountCode,
		fetch: (id) =>
			req.payload.findByID({
				collection: DiscountCodesSlug,
				id,
			}),
	})
	if (!codeOk) {
		cnsole.error("Can't fetching discount code:", codeError)
	}

	const { shipping } = await getCachedGlobal<CheckoutPageGlobal>(
		CheckoutPageGlobalSlug,
		0,
		Lang.Vietnamese,
	)()

	const {
		data: productsInfos,
		ok: productsInfosOk,
		error: productsInfosError,
	} = await arrayDepthHandler({
		data: data.cart?.products?.map((p) => p.product),
		fetch: async (ids) =>
			req.payload
				.find({
					collection: ProductsSlug,
					pagination: false,
					limit: 1000,
					where: {
						id: {
							in: ids,
						},
					},
				})
				.then((res) => res.docs),
	})
	if (!productsInfosOk) {
		cnsole.error("Can't fetching products infos:", productsInfosError)
	}

	const { total } = calculatePrices({
		code,
		shipping:
			(data.shippingInfo?.method === 'express'
				? shipping?.fastShippingPrice
				: shipping?.standardShippingPrice) ?? 0,
		products: data.cart?.products
			?.map((p) => {
				const matchedProduct = productsInfos?.find(
					(product) =>
						product.id === (typeof p.product === 'number' ? p.product : p.product.id),
				)
				const matchedVariant = matchedProduct?.variants?.find(
					(variant) => variant.sku === p.sku,
				)
				if (!matchedProduct || !matchedVariant) {
					cnsole.warn("Can't fetching product or variant for SKU:", p.sku)
					return null
				}
				return {
					id: matchedProduct.id,
					variant: {
						price: matchedVariant.price,
						quantity: p.quantity,
					},
					categoryIds: matchedProduct.productCategories?.map((c) =>
						typeof c === 'number' ? c : c.id,
					),
					subCategoryIds: matchedProduct.productSubCategories?.map((c) =>
						typeof c === 'number' ? c : c.id,
					),
				} satisfies NonNullable<Parameters<typeof calculatePrices>[0]['products']>[number]
			})
			.filter((p) => p !== null),
	})
	const paid =
		data.billing?.transactions?.reduce((acc, t) => acc + (t.transferAmount ?? 0), 0) ?? 0
	data.billing.paidInFull = total > 0 && total <= paid

	return data
}
