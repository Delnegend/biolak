import { CollectionAfterChangeHook } from 'payload'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { UsersSlug } from '@/collections/Users/slug'
import { CheckoutPageGlobalDefaults } from '@/globals/CheckoutPage/defaults'
import { Order } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'
import { tryCatch } from '@/utilities/tryCatch'

export const sendNotificationEmail: CollectionAfterChangeHook<Order> = async ({
	doc,
	req: { payload },
	operation,
}) => {
	if (operation !== 'create') return doc
	const typedDoc = doc as Partial<Order>

	const {
		data: customer,
		ok: customerOk,
		error: customerError,
	} = await depthHandler({
		data: typedDoc.customer,
		fetch: (id) =>
			payload.findByID({
				collection: CustomersSlug,
				id,
				select: {
					name: true,
				},
			}),
	})
	if (!customerOk) {
		console.error("[Orders/After change] Can't fetch customer:", customerError)
		return doc
	}

	const {
		data: productsInfos,
		error: productsInfosError,
		ok: productsInfosOk,
	} = await arrayDepthHandler({
		data: typedDoc.cart?.products?.map((i) => i.product),
		fetch: (ids) =>
			payload
				.find({
					collection: ProductsSlug,
					where: {
						id: {
							in: ids,
						},
					},
					depth: 1,
					pagination: false,
					limit: 1000,
				})
				.then((result) => result.docs),
	})
	if (!productsInfosOk) {
		console.error("[Orders/After change] Can't fetch products:", productsInfosError)
		return doc
	}

	let text =
		`Tên khách hàng: ${customer?.name ?? 'Không xác định'}\n` +
		`Số điện thoại: ${typedDoc.cart?.products?.[0]?.sku ?? 'Không xác định'}\n` +
		`Địa chỉ giao hàng: ${typedDoc.shippingInfo?.address?.houseNumber ?? 'Không xác định'}, ` +
		`${typedDoc.shippingInfo?.address?.ward ?? 'Không xác định'}, ` +
		`${typedDoc.shippingInfo?.address?.district ?? 'Không xác định'}, ` +
		`${typedDoc.shippingInfo?.address?.city ?? 'Không xác định'}\n` +
		`Phương thức giao hàng: ${typedDoc.shippingInfo?.method === 'express' ? 'Giao hàng nhanh' : 'Giao hàng tiêu chuẩn'}\n`

	if (typedDoc.cart?.products?.length) {
		text += `\nChi tiết đơn hàng:\n`
		for (const product of typedDoc.cart.products) {
			const matchedProduct = productsInfos.find(
				(p) =>
					p.id ===
					(typeof product.product === 'object' ? product.product.id : product.product),
			)
			if (!matchedProduct) continue
			const matchedVariant = matchedProduct.variants.find((v) => v.sku === product.sku)
			if (!matchedVariant) continue
			text +=
				`- Sản phẩm: ${matchedProduct.title ?? 'Không xác định'}, ` +
				`SKU: ${product.sku}, ` +
				`Số lượng: ${product.quantity}, ` +
				`Đơn giá: ${matchedVariant.price ?? 0}, ` +
				`Tổng: ${matchedVariant.price * product.quantity}\n`
		}
		const {
			data: code,
			ok,
			error,
		} = await depthHandler({
			data: typedDoc.cart?.discountCode,
			fetch(id) {
				return payload.findByID({
					collection: DiscountCodesSlug,
					id,
				})
			},
		})
		if (!ok) {
			console.error("[Orders/After change] Can't fetch discount code:", error)
		}
		const prices = calculatePrices({
			code,
			shipping:
				typedDoc.shippingInfo?.method === 'express'
					? CheckoutPageGlobalDefaults.shipping.fastShippingPrice
					: CheckoutPageGlobalDefaults.shipping.standardShippingPrice,
			products: typedDoc.cart.products.map((item) => {
				const matchedProduct = productsInfos.find(
					(p) => p.id === (typeof item.product === 'object' ? item.product.id : item.product),
				)
				const matchedVariant = matchedProduct?.variants.find((v) => v.sku === item.sku)
				return {
					id: typeof item.product === 'object' ? item.product.id : item.product,
					variant: {
						price: matchedVariant?.price ?? 0,
						quantity: item.quantity,
					},
					categoryIds: matchedProduct?.productCategories?.map((c) =>
						typeof c === 'object' ? c.id : c,
					),
					subCategoryIds: matchedProduct?.productSubCategories?.map((c) =>
						typeof c === 'object' ? c.id : c,
					),
				}
			}),
		})
		text += `\nTổng tạm tính: ${prices.provisional}\n`
		text += `Phí vận chuyển: ${prices.shipping}\n`
		text += `Giảm giá: ${prices.discount}\n`
		text += `Tổng cộng: ${prices.total}\n`
	}

	const {
		data: users,
		ok,
		error,
	} = await tryCatch(() =>
		payload.find({
			collection: UsersSlug,
			where: {
				receiveOrderEmail: {
					equals: true,
				},
			},
			pagination: false,
			limit: 1000,
		}),
	)
	if (!ok) {
		console.error("[Orders/After change] Can't fetch users for email:", error)
		return doc
	}
	const to = users.docs
		.map((user) => user.email)
		.filter((email) => !!email)
		.join(', ')

	const {
		ok: resultOk,
		error: resultError,
		data: result,
	} = await tryCatch(() =>
		payload.sendEmail({
			from: process.env.SMTP_FROM,
			to,
			subject: 'BioLAK có đơn hàng mới từ ' + (customer?.name ?? 'Khách hàng không xác định'),
			text,
		}),
	)
	if (!resultOk) {
		console.error("[Orders/After change] Can't send email:", resultError)
		return doc
	}
	console.log('[Orders/After change] Message sent:', result)
	return doc
}
