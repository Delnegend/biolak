import { z } from 'zod/v4'

import { Lang } from '@/i18n/routing'

const m = {
	nameRequired: {
		[Lang.English]: 'Name is required',
		[Lang.Vietnamese]: 'Họ và tên là bắt buộc',
	},
	invalidEmail: {
		[Lang.English]: 'Invalid email address',
		[Lang.Vietnamese]: 'Địa chỉ email không hợp lệ',
	},
	emailRequired: { [Lang.English]: 'Email is required', [Lang.Vietnamese]: 'Email là bắt buộc' },
	phoneRequired: {
		[Lang.English]: 'Phone number is required',
		[Lang.Vietnamese]: 'Số điện thoại là bắt buộc',
	},
	phoneDigitsOnly: {
		[Lang.English]: 'Phone number must contain only digits',
		[Lang.Vietnamese]: 'Số điện thoại chỉ được chứa chữ số',
	},
	cityRequired: {
		[Lang.English]: 'City is required',
		[Lang.Vietnamese]: 'Tỉnh/Thành phố là bắt buộc',
	},
	districtRequired: {
		[Lang.English]: 'District is required',
		[Lang.Vietnamese]: 'Quận là bắt buộc',
	},
	wardRequired: { [Lang.English]: 'Ward is required', [Lang.Vietnamese]: 'Phường là bắt buộc' },
	houseNumberRequired: {
		[Lang.English]: 'House number is required',
		[Lang.Vietnamese]: 'Số nhà là bắt buộc',
	},
}

function t(locale: Lang, key: keyof typeof m): string {
	return m[key][locale]
}

export function CheckoutSchema(locale: Lang) {
	return z.object({
		personalDetails: z
			.object({
				name: z.string().min(1, t(locale, 'nameRequired')),
				email: z
					.email({ error: t(locale, 'invalidEmail') })
					.min(1, t(locale, 'emailRequired')),
				confirmReceiveEmail: z.boolean().optional(),
				phoneNumber: z
					.string()
					.min(1, t(locale, 'phoneRequired'))
					.regex(/^\d+$/, { message: t(locale, 'phoneDigitsOnly') }),
			})
			.required(),
		shippingInfo: z.object({
			address: z.object({
				city: z.string().min(1, t(locale, 'cityRequired')),
				district: z.string().min(1, t(locale, 'districtRequired')),
				ward: z.string().min(1, t(locale, 'wardRequired')),
				houseNumber: z.string().min(1, t(locale, 'houseNumberRequired')),
			}),
			method: z.enum(['standard', 'express']),
		}),
		paymentMethod: z.enum(['cod', 'bankTransfer']),
		discountCode: z.string().optional(),
		sendGift: z.object({
			sender: z.string().optional(),
			receiver: z.string().optional(),
			message: z.string().optional(),
		}),
	})
}
