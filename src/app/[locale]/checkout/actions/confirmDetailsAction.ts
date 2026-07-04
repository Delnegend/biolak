'use server'
import config from '@payload-config'
import { nanoid } from 'nanoid'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import { z } from 'zod/v4'

import { CustomersSlug } from '@/collections/Customers/slug'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { OrdersSlug } from '@/collections/Orders/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { Lang } from '@/i18n/routing'
import { CheckoutPageGlobal } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { newLogger } from '@/utilities/logger'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

import { cartSchema } from './cartSchema'
import { CheckoutSchema } from './checkoutSchema'
import CITY_DISTRICT_WARD from './city-district-ward.json'

const logger = newLogger('confirmDetailsAction')

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

export async function confirmDetailsAction(
	input: unknown,
	locale?: Lang,
): Promise<
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
	const t = await getTranslations('checkout.errors')
	const schema = confirmDetailsActionSchema(locale ?? Lang.Vietnamese)

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
			error: t('invalidDestination'),
		}

	// init payload

	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) {
		logger.error("Can't initialize payload:", payloadError)
		return {
			success: false,
			data: null,
			error: t('cantInitPayload', { error: `${payloadError}` }),
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
			error: t('cantFindCustomer', { error: `${matchedCustomerError}` }),
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
				error: t('cantCreateCustomer', { error: `${newCustomerError}` }),
			}

		customerExistingInfo = data
	}
	if (!customerExistingInfo)
		return {
			success: false,
			data: null,
			error: t('cantCreateCustomerFallback'),
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
				error: t('cantFindDiscount', { error: `${error}` }),
			}

		if (data.docs.length > 0) {
			discountCode = data.docs[0]
			if (!discountCode)
				return {
					success: false,
					data: null,
					error: t('discountNotFound'),
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
		logger.error("Can't get products to validate")
		return {
			success: false,
			data: null,
			error: t('cantGetProducts', { error: `${matchedProductsError}` }),
		}
	}

	// re-structure & fill prices

	const reformattedCart = cart
		.map((item) => {
			const matchedProduct = matchedProducts.docs.find((p) => p.id === item.productId)
			const matchedSku = matchedProduct?.variants.find((v) => v.sku === item.productSku)

			if (!matchedSku) {
				logger.error(
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
	const standardPrice = shipping?.standardShippingPrice ?? 30000
	const expressPrice = shipping?.fastShippingPrice ?? 50000

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
			error: t('cantCreateOrder', { error: `${orderError}` }),
		}

	if (!order)
		return {
			success: false,
			data: null,
			error: t('orderNotCreated'),
		}

	return {
		success: true,
		error: null,
		data: { invoiceId: order.invoiceId },
	}
}
