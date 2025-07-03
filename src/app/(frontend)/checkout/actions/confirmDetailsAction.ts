'use server'
import config from '@payload-config'
import { nanoid } from 'nanoid'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { OrdersSlug } from '@/collections/Orders/slug'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { getClientLang } from '@/utilities/getClientLocale'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

import { cartSchema } from './cartSchema'
import { CheckoutSchema } from './checkoutSchema'
import CITY_DISTRICT_WARD from './city-district-ward.json'

const cnsole = cnsoleBuilder('confirmDetailsAction')

interface CityDistrictWard {
	[key: string]: {
		[key: string]: string[]
	}
}

function confirmDetailsActionSchema(locale: Lang) {
	return z.object({
		details: CheckoutSchema(locale),
		cart: cartSchema,
	})
}

export type ConfirmDetailsActionInput = z.infer<ReturnType<typeof confirmDetailsActionSchema>>

export async function confirmDetailsAction(input: unknown): Promise<
	| {
			success: true
			data: {
				invoiceId: string
			}
			error: null
	  }
	| {
			success: false
			data: null
			error: string
	  }
> {
	const locale = await getClientLang()
	const schema = confirmDetailsActionSchema(locale)

	const {
		ok: parsedInputOk,
		data: parsedInput,
		error: parsedInputError,
	} = tryCatchSync(() => schema.parse(input))
	if (!parsedInputOk) {
		if (parsedInputError instanceof z.ZodError) {
			return {
				success: false,
				data: null,
				error: z.prettifyError(parsedInputError),
			}
		}
		return {
			success: false,
			data: null,
			error: `${parsedInputError}`,
		}
	}

	const { cart, details } = parsedInput
	const { personalDetails } = details
	const { city, district, ward } = details.shippingInfo.address
	const cityDistrictWard: CityDistrictWard = CITY_DISTRICT_WARD as CityDistrictWard
	if (
		!cityDistrictWard[city] ||
		!cityDistrictWard[city][district] ||
		!cityDistrictWard[city][district].includes(ward)
	) {
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: 'Invalid district or ward for the selected city',
				[Lang.Vietnamese]: 'Quận hoặc phường không hợp lệ cho thành phố đã chọn',
			})(locale),
		}
	}

	cnsole.debug('Confirmed details:', parsedInput)

	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) {
		cnsole.error("Can't initialize payload:", payloadError)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't initialize payload: ${payloadError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể khởi tạo payload: ${payloadError}`,
			})(locale),
		}
	}

	const {
		data: matchedCustomer,
		ok: matchedCustomerOk,
		error: matchedCustomerError,
	} = await tryCatch(() =>
		payload.find({
			collection: CustomersSlug,
			where: {
				or: [
					{
						email: {
							equals: personalDetails.email,
						},
					},
					{
						phoneNumber: {
							equals: personalDetails.phoneNumber,
						},
					},
				],
			},
			pagination: false,
			limit: 1,
		}),
	)
	if (!matchedCustomerOk) {
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't find customer: ${matchedCustomerError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tìm thấy khách hàng: ${matchedCustomerError}`,
			})(locale),
		}
	}

	let customer = matchedCustomer.docs[0]
	if (!customer) {
		const {
			data,
			ok: newCustomerOk,
			error: newCustomerError,
		} = await tryCatch(() =>
			payload.create({
				collection: CustomersSlug,
				overrideAccess: true,
				data: {
					name: personalDetails.name,
					email: personalDetails.email,
					phoneNumber: personalDetails.phoneNumber,
				},
			}),
		)
		if (!newCustomerOk) {
			return {
				success: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error, can't create new customer: ${newCustomerError}`,
					[Lang.Vietnamese]: `Lỗi nội bộ, không thể tạo khách hàng mới: ${newCustomerError}`,
				})(locale),
			}
		}
		customer = data
	}

	if (!customer)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: 'Customer not found or created',
				[Lang.Vietnamese]: 'Không tìm thấy hoặc tạo khách hàng',
			})(locale),
		}

	let discountCode = null
	if (details.discountCode) {
		const { data, ok, error } = await tryCatch(() =>
			payload.find({
				collection: DiscountCodesSlug,
				overrideAccess: true,
				where: {
					code: {
						equals: details.discountCode,
					},
				},
				pagination: false,
				limit: 1,
			}),
		)
		if (!ok) {
			return {
				success: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error, can't find discount code: ${error}`,
					[Lang.Vietnamese]: `Lỗi nội bộ, không thể tìm thấy mã giảm giá: ${error}`,
				})(locale),
			}
		}
		if (data.docs.length > 0) {
			discountCode = data.docs[0]
			if (!discountCode) {
				return {
					success: false,
					data: null,
					error: matchLang({
						[Lang.English]: 'Discount code not found',
						[Lang.Vietnamese]: 'Không tìm thấy mã giảm giá',
					})(locale),
				}
			}
		}
	}

	let note = ''
	if (customer.email !== personalDetails.email) note = 'Ghi đè email: ' + personalDetails.email
	if (customer.phoneNumber !== personalDetails.phoneNumber)
		note += `Ghi đè số điện thoại: ${personalDetails.phoneNumber}`

	const {
		data: order,
		ok: orderOk,
		error: orderError,
	} = await tryCatch(() =>
		payload.create({
			collection: OrdersSlug,
			data: {
				invoiceId: nanoid(),
				note,
				customer,
				billing: {
					method: details.billingMethod,
				},
				shippingInfo: {
					address: [
						details.shippingInfo.address.houseNumber,
						details.shippingInfo.address.ward,
						details.shippingInfo.address.district,
						details.shippingInfo.address.city,
					]
						.filter(Boolean)
						.join(', '),
					method: details.shippingInfo.method,
				},
				cart: {
					discountCode,
					products: cart,
				},
			},
			overrideAccess: true,
		}),
	)

	if (!orderOk) {
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't create order: ${orderError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tạo đơn hàng: ${orderError}`,
			})(locale),
		}
	}
	if (!order) {
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: 'Order not created',
				[Lang.Vietnamese]: 'Đơn hàng không được tạo',
			})(locale),
		}
	}

	return {
		success: true,
		error: null,
		data: { invoiceId: order.invoiceId },
	}
}
