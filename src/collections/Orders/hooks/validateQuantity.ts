import { NumberFieldSingleValidation } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Order } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

const cnsole = cnsoleBuilder('Orders/validateQuantity')

export const validateQuantity: NumberFieldSingleValidation = async (value, ctx) => {
	const locale = ctx.req.locale === Lang.English ? Lang.English : Lang.Vietnamese
	const siblingData = ctx.siblingData as NonNullable<NonNullable<Partial<Order>['cart']>>[number]

	if (!siblingData.product)
		return matchLang({
			[Lang.English]: 'Product not selected',
			[Lang.Vietnamese]: 'Chưa chọn sản phẩm',
		})(locale)
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
		cnsole.error("Can't fetch product:", productError)
		return matchLang({
			[Lang.English]: 'Product not found',
			[Lang.Vietnamese]: 'Không tìm thấy sản phẩm',
		})(locale)
	}

	const matchedVariant = product?.variants.find((v) => v.sku === siblingData.sku)
	if (!matchedVariant)
		return matchLang({
			[Lang.English]: 'Variant not found',
			[Lang.Vietnamese]: 'Không tìm thấy loại',
		})(locale)

	if ((value ?? 0) < 1)
		return matchLang({
			[Lang.English]: 'Quantity must be at least 1',
			[Lang.Vietnamese]: 'Số lượng phải lớn hơn hoặc bằng 1',
		})(locale)

	if ((value ?? 0) > matchedVariant.stock)
		return matchLang({
			[Lang.English]: 'Quantity exceeds stock',
			[Lang.Vietnamese]: 'Số lượng vượt quá tồn kho',
		})(locale)

	return true
}
