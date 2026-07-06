import { getTranslations } from 'next-intl/server'
import { TextFieldSingleValidation } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Order } from '@/payload-types'
import { depthHandler } from '@/utilities/depthHandler'
import { newLogger } from '@/utilities/logger'

const logger = newLogger('Orders/validateSku')

export const validateSku: TextFieldSingleValidation = async (value, ctx) => {
	const t = await getTranslations('orders.validation')

	const product_ = (ctx.siblingData as NonNullable<NonNullable<Partial<Order>['cart']>>[number])
		?.product

	if (!product_) {
		logger.error('Product not selected')
		return t('productNotSelected')
	}

	const {
		data: product,
		ok: productOk,
		error: productError,
	} = await depthHandler({
		data: product_,
		fetch: (id) =>
			ctx.req.payload.findByID({
				collection: ProductsSlug,
				id,
			}),
	})
	if (!productOk || !product) {
		logger.error("Can't fetch product:", productError)
		return t('productNotFound')
	}

	const { variants } = product
	if (!variants?.length) return t('noVariants')

	if (variants.find((v) => v.sku === value)) {
		return true
	}

	return `${t('skuMustBeOneOf')}: ${variants?.map((v) => v.sku).join(', ')}`
}
