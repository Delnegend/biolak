import config from '@payload-config'
import { getPayload } from 'payload'

import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { DiscountCode } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch } from '@/utilities/tryCatch'

export type GetDiscountAPI = {
	PATH: `/api/discount?code=${string}`
	Response:
		| {
				data: {
					allProducts: DiscountCode['allProducts']
					applicableCategories: DiscountCode['applicableCategories']
					applicableProducts: DiscountCode['applicableProducts']
					discountType: DiscountCode['discountType']
					value: DiscountCode['value']
					maxDiscount: DiscountCode['maxDiscount']
				}
				ok: true
				error: null
		  }
		| {
				data: null
				ok: false
				error: string
		  }
}

export async function GET({ url }: Request): Promise<Response> {
	const { searchParams } = new URL(url)
	const code = searchParams.get('code')
	const [{ data: payload, ok: payloadOk, error: payloadError }, locale] = await Promise.all([
		tryCatch(() => getPayload({ config })),
		getClientLang(),
	])

	if (!code)
		return new Response(
			JSON.stringify({
				ok: false,
				data: null,
				error: matchLang({
					[Lang.English]: 'Code is required',
					[Lang.Vietnamese]: 'Mã giảm giá là bắt buộc',
				})(locale),
			} satisfies GetDiscountAPI['Response']),
			{
				status: 400,
			},
		)

	if (!payloadOk)
		return new Response(
			JSON.stringify({
				ok: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error: ${payloadError}`,
					[Lang.Vietnamese]: `Lỗi nội bộ: ${payloadError}`,
				})(locale),
			} satisfies GetDiscountAPI['Response']),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

	const {
		data: discount,
		ok,
		error,
	} = await tryCatch(async () =>
		payload.find({
			collection: DiscountCodesSlug,
			where: {
				code: {
					equals: code,
				},
			},
			limit: 1,
			pagination: false,
			overrideAccess: true,
			select: {
				allProducts: true,
				applicableCategories: true,
				applicableProducts: true,
				discountType: true,
				value: true,
				isActive: true,
				expirationDate: true,
				amount: true,
				maxDiscount: true,
			},
		}),
	)

	if (!ok)
		return new Response(
			JSON.stringify({
				ok: false,
				data: null,
				error: matchLang({
					[Lang.English]: `Internal error: ${error}`,
					[Lang.Vietnamese]: `Lỗi nội bộ: ${error}`,
				})(locale),
			} satisfies GetDiscountAPI['Response']),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

	if (
		!discount ||
		!discount.docs[0] ||
		!discount.docs[0].isActive ||
		discount.docs[0].amount === null ||
		discount.docs[0].amount === undefined
	) {
		return new Response(
			JSON.stringify({
				ok: false,
				data: null,
				error: matchLang({
					[Lang.English]: 'Invalid discount code',
					[Lang.Vietnamese]: 'Mã giảm giá không hợp lệ',
				})(locale),
			} satisfies GetDiscountAPI['Response']),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}

	if (discount.docs[0].expirationDate) {
		const expirationDate = new Date(discount.docs[0].expirationDate)
		if (expirationDate < new Date()) {
			return new Response(
				JSON.stringify({
					ok: false,
					data: null,
					error: matchLang({
						[Lang.English]: 'Discount code has expired',
						[Lang.Vietnamese]: 'Mã giảm giá đã hết hạn',
					})(locale),
				} satisfies GetDiscountAPI['Response']),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
		}
	}

	return new Response(
		JSON.stringify({
			ok: true,
			data: {
				allProducts: discount.docs[0].allProducts,
				applicableCategories: discount.docs[0].applicableCategories,
				applicableProducts: discount.docs[0].applicableProducts,
				discountType: discount.docs[0].discountType,
				value: discount.docs[0].value,
				maxDiscount: discount.docs[0].maxDiscount,
			},
			error: null,
		} satisfies GetDiscountAPI['Response']),
		{
			status: 501,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
