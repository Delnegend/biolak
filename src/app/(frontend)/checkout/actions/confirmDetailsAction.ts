'use server'
import config from '@payload-config'
import { nanoid } from 'nanoid'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { OrdersSlug } from '@/collections/Orders/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobalDefaults } from '@/globals/CheckoutPage/defaults'
import { CheckoutPageGlobal } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
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

	// parse input

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
	const { personalDetails: customerProvidedInfo } = details
	const { city, district, ward } = details.shippingInfo.address

	// validate destination

	const cityDistrictWard: CityDistrictWard = CITY_DISTRICT_WARD as CityDistrictWard
	if (
		!cityDistrictWard[city] ||
		!cityDistrictWard[city][district] ||
		!cityDistrictWard[city][district].includes(ward)
	)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: 'Invalid district or ward for the selected city',
				[Lang.Vietnamese]: 'Quận hoặc phường không hợp lệ cho thành phố đã chọn',
			})(locale),
		}

	// init payload

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

	// get matched customer

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
							equals: customerProvidedInfo.email,
						},
					},
					{
						phoneNumber: {
							equals: customerProvidedInfo.phoneNumber,
						},
					},
				],
			},
			pagination: false,
			limit: 1,
		}),
	)
	if (!matchedCustomerOk)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't find customer: ${matchedCustomerError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tìm thấy khách hàng: ${matchedCustomerError}`,
			})(locale),
		}

	// create new customer if not exists

	let customerExistingInfo = matchedCustomer.docs[0]
	if (!customerExistingInfo) {
		const {
			data,
			ok: newCustomerOk,
			error: newCustomerError,
		} = await tryCatch(() =>
			payload.create({
				collection: CustomersSlug,
				overrideAccess: true,
				data: {
					name: customerProvidedInfo.name,
					email: customerProvidedInfo.email,
					phoneNumber: customerProvidedInfo.phoneNumber,
				},
			}),
		)
		if (!newCustomerOk)
			return {
				success: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error, can't create new customer: ${newCustomerError}`,
					[Lang.Vietnamese]: `Lỗi nội bộ, không thể tạo khách hàng mới: ${newCustomerError}`,
				})(locale),
			}

		customerExistingInfo = data
	}
	if (!customerExistingInfo)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: "Can't create new customer",
				[Lang.Vietnamese]: 'Không thể tạo khách hàng mới',
			})(locale),
		}

	// validate discount code

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
		if (!ok)
			return {
				success: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error, can't find discount code: ${error}`,
					[Lang.Vietnamese]: `Lỗi nội bộ, không thể tìm thấy mã giảm giá: ${error}`,
				})(locale),
			}

		if (data.docs.length > 0) {
			discountCode = data.docs[0]
			if (!discountCode)
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

	// validate products

	const {
		data: matchedProducts,
		ok: matchedProductsOk,
		error: matchedProductsError,
	} = await tryCatch(() =>
		payload.find({
			collection: ProductsSlug,
			where: {
				id: {
					in: cart.map((i) => i.productId),
				},
			},
		}),
	)
	if (!matchedProductsOk) {
		cnsole.error("Can't get products to validate")
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't get products: ${matchedProductsError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể lấy sản phẩm: ${matchedProductsError}`,
			})(locale),
		}
	}

	// re-structure & fill prices

	const reformattedCart = cart
		.map((item) => {
			const matchedProduct = matchedProducts.docs.find((p) => p.id === item.productId)
			const matchedSku = matchedProduct?.variants.find((v) => v.sku === item.productSku)

			if (!matchedSku) {
				cnsole.error(
					"Can't get matched variant for product in cart",
					'productId',
					item.productId,
					'productSku',
					item.productSku,
				)
				return null
			}

			return {
				id: item.productId,
				variant: {
					price: matchedSku.price,
					quantity: item.quantity,
				},
				categoryIds: matchedProduct?.productCategories?.map((c) =>
					typeof c === 'number' ? c : c.id,
				),
				subCategoryIds: matchedProduct?.productSubCategories?.map((c) =>
					typeof c === 'number' ? c : c.id,
				),

				title: matchedProduct?.title ?? 'Không xác định',
				total: matchedSku.price * item.quantity,
				variantSku: item.productSku,
			} satisfies {
				id: number

				// for calculating prices
				variant: { price: number; quantity: number }
				categoryIds?: number[]
				subCategoryIds?: number[]

				// for Orders collection
				title: string
				total: number
				variantSku: string
			}
		})
		.filter((item) => item !== null)

	// final prices

	const { shipping } = await getCachedGlobal<CheckoutPageGlobal>(CheckoutPageGlobalSlug)()
	const standardPrice =
		shipping?.standardShippingPrice ?? CheckoutPageGlobalDefaults.shipping.standardShippingPrice
	const expressPrice =
		shipping?.fastShippingPrice ?? CheckoutPageGlobalDefaults.shipping.fastShippingPrice

	const finalPrices = calculatePrices({
		shipping: details.shippingInfo.method === 'express' ? expressPrice : standardPrice,
		products: reformattedCart,
		code: discountCode,
	})

	// insert order

	const {
		data: order,
		ok: orderOk,
		error: orderError,
	} = await tryCatch(() =>
		payload.create({
			collection: OrdersSlug,
			data: {
				invoiceId: nanoid(),
				receiverNote:
					customerProvidedInfo.email &&
					customerExistingInfo.email !== customerProvidedInfo.email
						? 'Ghi đè email: ' + customerProvidedInfo.email
						: '',
				customer: customerExistingInfo,
				receiverName: customerProvidedInfo.name,
				receiverAddress: [
					details.shippingInfo.address.houseNumber,
					details.shippingInfo.address.ward,
					details.shippingInfo.address.district,
					details.shippingInfo.address.city,
				]
					.filter(Boolean)
					.join('\n'),
				receiverPhoneNumber: customerProvidedInfo.phoneNumber,
				message: {
					receiver: parsedInput.details.sendGift.receiver,
					sender: parsedInput.details.sendGift.sender,
					content: parsedInput.details.sendGift.message,
				},
				billing: {
					method: details.paymentMethod,
				},
				shippingInfo: {
					method: details.shippingInfo.method,
				},
				cart: reformattedCart.map((item) => ({
					title: item.title,
					product: item.id,
					sku: item.variantSku,
					quantity: item.variant.quantity,
					previewTotal: item.total,
					priceAtBuy: item.variant.price,
				})),
				prices: {
					...finalPrices,
					discountCode,
				},
			},
			overrideAccess: true,
		}),
	)

	if (!orderOk)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: `Internal error, can't create order: ${orderError}`,
				[Lang.Vietnamese]: `Lỗi nội bộ, không thể tạo đơn hàng: ${orderError}`,
			})(locale),
		}

	if (!order)
		return {
			success: false,
			data: null,
			error: matchLang({
				[Lang.English]: 'Order not created',
				[Lang.Vietnamese]: 'Đơn hàng không được tạo',
			})(locale),
		}

	return {
		success: true,
		error: null,
		data: { invoiceId: order.invoiceId },
	}
}
