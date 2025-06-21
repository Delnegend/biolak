'use server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { OrdersSlug } from '@/collections/Orders/slug'
import { getClientLang } from '@/utilities/getClientLocale'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

import CITY_DISTRICT_WARD from './city-district-ward.json'
import { ConfirmDetailsActionSchema } from './confirmDetailsActionSchema'

interface CityDistrictWard {
	[key: string]: {
		[key: string]: string[]
	}
}

export async function confirmDetailsAction(input: unknown): Promise<
	| {
			success: true
	  }
	| {
			success: false
			error: string
	  }
> {
	const locale = await getClientLang()
	const Schema = ConfirmDetailsActionSchema(locale)

	const {
		ok: parsedInputOk,
		data: parsedInput,
		error: parsedInputError,
	} = tryCatchSync(() => Schema.parse(input))
	if (!parsedInputOk) {
		if (parsedInputError instanceof z.ZodError) {
			return {
				success: false,
				error: z.prettifyError(parsedInputError),
			}
		}
		return {
			success: false,
			error: `${parsedInputError}`,
		}
	}

	const { personalDetails } = parsedInput
	const { city, district, ward } = parsedInput.shippingInfo.address
	const cityDistrictWard: CityDistrictWard = CITY_DISTRICT_WARD as CityDistrictWard
	if (
		!cityDistrictWard[city] ||
		!cityDistrictWard[city][district] ||
		!cityDistrictWard[city][district].includes(ward)
	) {
		return {
			success: false,
			error: matchLang({
				[Lang.English]: 'Invalid district or ward for the selected city',
				[Lang.Vietnamese]: 'Quận hoặc phường không hợp lệ cho thành phố đã chọn',
			})(locale),
		}
	}

	if (process.env.NODE_ENV === 'development') console.log('Confirmed details:', parsedInput)

	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) {
		return {
			success: false,
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
						phone: {
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
			error: matchLang({
				[Lang.English]: `Internal error, can't find customer: ${matchedCustomerError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tìm thấy khách hàng: ${matchedCustomerError}`,
			})(locale),
		}
	}

	let customer = matchedCustomer.docs[0]
	if (!matchedCustomer.docs) {
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
			error: matchLang({
				[Lang.English]: 'Customer not found or created',
				[Lang.Vietnamese]: 'Không tìm thấy hoặc tạo khách hàng',
			})(locale),
		}

	let discountCode = null
	if (parsedInput.cart.discountCode) {
		const { data, ok, error } = await tryCatch(() =>
			payload.find({
				collection: DiscountCodesSlug,
				overrideAccess: true,
				where: {
					code: {
						equals: parsedInput.cart.discountCode,
					},
				},
				pagination: false,
				limit: 1,
			}),
		)
		if (!ok) {
			return {
				success: false,
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
					error: matchLang({
						[Lang.English]: 'Discount code not found',
						[Lang.Vietnamese]: 'Không tìm thấy mã giảm giá',
					})(locale),
				}
			}
		}
	}

	const {
		data: order,
		ok: orderOk,
		error: orderError,
	} = await tryCatch(() =>
		payload.create({
			collection: OrdersSlug,
			data: {
				customer,
				billing: {
					method: parsedInput.billingMethod,
				},
				shippingInfo: parsedInput.shippingInfo,
				cart: {
					discountCode,
					products: parsedInput.cart.products,
				},
			},
			overrideAccess: true,
		}),
	)

	if (!orderOk) {
		return {
			success: false,
			error: matchLang({
				[Lang.English]: `Internal error, can't create order: ${orderError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tạo đơn hàng: ${orderError}`,
			})(locale),
		}
	}
	if (!order) {
		return {
			success: false,
			error: matchLang({
				[Lang.English]: 'Order not created',
				[Lang.Vietnamese]: 'Đơn hàng không được tạo',
			})(locale),
		}
	}

	return { success: true }
}
