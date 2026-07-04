import { getTranslations } from 'next-intl/server'
import { NumberFieldSingleValidation } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Order } from '@/payload-types'
import { depthHandler } from '@/utilities/depthHandler'
import { newLogger } from '@/utilities/logger'

const logger = newLogger('Orders/validateQuantity')

export const validateQuantity: NumberFieldSingleValidation = async (value, ctx) => {
	const t = await getTranslations('orders.validation')
	const siblingData = ctx.siblingData as NonNullable<NonNullable<Partial<Order>['cart']>>[number]

	if (!siblingData.product) return t('productNotSelected')
	const {
		data: product,
		ok: productOk,
		error: productError,
	} = await depthHandler({
		data: siblingData.product,
		fetch: (id) =>
			ctx.req.payload.findByID({
				collection: ProductsSlug,
				id,
				select: {
					variants: true,
				},
			}),
	})
	if (!productOk) {
		logger.error("Can't fetch product:", productError)
		return t('productNotFound')
	}

	const matchedVariant = product?.variants.find((v) => v.sku === siblingData.sku)
	if (!matchedVariant) return t('variantNotFound')

	if ((value ?? 0) < 1) return t('quantityMin')

	if ((value ?? 0) > matchedVariant.stock) return t('quantityExceedsStock')

	return true
}
