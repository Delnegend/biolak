import { CollectionAfterChangeHook } from 'payload'

import { CustomersSlug } from '@/collections/Customers/slug'
import { UsersSlug } from '@/collections/Users/slug'
import { Order } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { depthHandler } from '@/utilities/depthHandler'
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

	let text =
		`Tên khách hàng: ${doc.receiverName ?? 'Không xác định'}\n` +
		`Số điện thoại: ${doc.receiverPhoneNumber ?? 'Không xác định'}\n` +
		`Địa chỉ giao hàng: ${doc.receiverAddress?.split('\n').join(', ') ?? 'Không xác định'}\n` +
		`Phương thức giao hàng: ${doc.shippingInfo?.method === 'express' ? 'Giao hàng nhanh' : 'Giao hàng tiêu chuẩn'}\n`

	if (doc.cart?.length) {
		text += `\nChi tiết đơn hàng:\n`
		for (const item of doc.cart) {
			text +=
				`- Sản phẩm: ${item.title ?? 'Không xác định'}, ` +
				`SKU: ${item.sku}, ` +
				`Số lượng: ${item.quantity}, ` +
				`Đơn giá: ${item.priceAtBuy}, ` +
				`Tổng: ${item.previewTotal}\n`
		}
		text += `\nTổng tạm tính: ${doc.prices.provisional}\n`
		text += `Phí vận chuyển: ${doc.prices.shipping}\n`
		text += `Giảm giá: ${doc.prices.discount}\n`
		text += `Tổng cộng: ${doc.prices.total}\n`
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
