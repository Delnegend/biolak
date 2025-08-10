import { TextFieldSingleValidation } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Order } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

const cnsole = cnsoleBuilder('Orders/validateSku')

export const validateSku: TextFieldSingleValidation = async (value, ctx) => {
	const locale = ctx.req.locale === Lang.English ? Lang.English : Lang.Vietnamese

	const product_ = (ctx.siblingData as NonNullable<NonNullable<Partial<Order>['cart']>>[number])
		?.product

	if (!product_) {
		cnsole.error('Product not selected')
		return matchLang({
			[Lang.English]: 'Product not selected',
			[Lang.Vietnamese]: 'Chưa chọn sản phẩm',
		})(locale)
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
		cnsole.error("Can't fetch product:", productError)
		return matchLang({
			[Lang.English]: 'Product not found',
			[Lang.Vietnamese]: 'Không tìm thấy sản phẩm',
		})(locale)
	}

	const { variants } = product
	if (!variants?.length)
		return matchLang({
			[Lang.English]: 'Product has no variants',
			[Lang.Vietnamese]: 'Sản phẩm không có loại nào',
		})(locale)

	if (variants.find((v) => v.sku === value)) {
		return true
	}

	return `${matchLang({
		[Lang.English]: 'SKU must be one of',
		[Lang.Vietnamese]: 'Mã SKU chỉ có thể là một trong các loại',
	})(locale)}: ${variants?.map((v) => v.sku).join(', ')}`
}
