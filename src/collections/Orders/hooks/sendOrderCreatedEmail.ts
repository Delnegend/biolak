import { CollectionAfterChangeHook } from 'payload'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { UsersSlug } from '@/collections/Users/slug'
import { CheckoutPageGlobalDefaults } from '@/globals/CheckoutPage/defaults'
import { Order } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'
import { tryCatch } from '@/utilities/tryCatch'

const cnsole = cnsoleBuilder('Orders/sendOrderCreatedEmail')

export const sendOrderCreatedEmail: CollectionAfterChangeHook<Order> = async ({
	doc,
	req: { payload },
	operation,
}) => {
	if (operation !== 'create') return doc

	const {
		data: customer,
		ok: customerOk,
		error: customerError,
	} = await depthHandler({
		data: doc.customer,
		fetch: (id) =>
			payload.findByID({
				collection: CustomersSlug,
				id,
				select: {
					name: true,
					phoneNumber: true,
				},
			}),
	})
	if (!customerOk) {
		cnsole.error("Can't fetch customer:", customerError)
		return doc
	}

	const {
		data: productsInfos,
		error: productsInfosError,
		ok: productsInfosOk,
	} = await arrayDepthHandler({
		data: doc.cart?.products?.map((i) => i.product),
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
		cnsole.error("Can't fetch products:", productsInfosError)
		return doc
	}

	let text =
		`Tên khách hàng: ${customer?.name ?? 'Không xác định'}\n` +
		`Số điện thoại: ${customer?.phoneNumber ?? 'Không xác định'}\n` +
		`Địa chỉ giao hàng: ${doc.shippingInfo?.address?.split('\n').join(', ') ?? 'Không xác định'}\n` +
		`Phương thức giao hàng: ${doc.shippingInfo?.method === 'express' ? 'Giao hàng nhanh' : 'Giao hàng tiêu chuẩn'}\n`

	if (doc.cart?.products?.length) {
		text += `\nChi tiết đơn hàng:\n`
		for (const product of doc.cart.products) {
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
			data: doc.cart?.discountCode,
			fetch(id) {
				return payload.findByID({
					collection: DiscountCodesSlug,
					id,
				})
			},
		})
		if (!ok) {
			cnsole.error("Can't fetch discount code:", error)
		}
		const prices = calculatePrices({
			code,
			shipping:
				doc.shippingInfo?.method === 'express'
					? CheckoutPageGlobalDefaults.shipping.fastShippingPrice
					: CheckoutPageGlobalDefaults.shipping.standardShippingPrice,
			products: doc.cart.products.map((item) => {
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
		cnsole.error("Can't fetch users for email:", error)
		return doc
	}
	const to = users.docs
		.map((user) => user.email)
		.filter(Boolean)
		.join(', ')

	if (!to) {
		cnsole.info('No users to send email to, skipping email sending')
		return doc
	}

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
		cnsole.error("Can't send email:", resultError)
		return doc
	}
	cnsole.info('Message sent:', result)
	return doc
}
