import { z } from 'zod/v4'

import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import CITY_DISTRICT_WARD from './city-district-ward.json'

export function ConfirmDetailsActionSchema(locale: Lang) {
	return z.object({
		personalDetails: z
			.object({
				name: z.string().min(
					1,
					matchLang({
						[Lang.English]: 'Name is required',
						[Lang.Vietnamese]: 'Họ và tên là bắt buộc',
					})(locale),
				),
				email: z.email().min(
					1,
					matchLang({
						[Lang.English]: 'Email is required',
						[Lang.Vietnamese]: 'Email là bắt buộc',
					})(locale),
				),
				confirmReceiveEmail: z.boolean().optional(),
				phoneNumber: z.string().min(
					1,
					matchLang({
						[Lang.English]: 'Phone number is required',
						[Lang.Vietnamese]: 'Số điện thoại là bắt buộc',
					})(locale),
				),
			})
			.required(),
		shippingInfo: z.object({
			address: z.object({
				city: z.enum(Object.keys(CITY_DISTRICT_WARD) as [string, ...string[]]),
				district: z.string().min(
					1,
					matchLang({
						[Lang.English]: 'District is required',
						[Lang.Vietnamese]: 'Quận là bắt buộc',
					})(locale),
				),
				ward: z.string().min(
					1,
					matchLang({
						[Lang.English]: 'Ward is required',
						[Lang.Vietnamese]: 'Phường là bắt buộc',
					})(locale),
				),
				houseNumber: z.string().min(
					1,
					matchLang({
						[Lang.English]: 'House number is required',
						[Lang.Vietnamese]: 'Số nhà là bắt buộc',
					})(locale),
				),
			}),
			method: z.enum(['standard', 'express']),
		}),
		billingMethod: z.enum(['cod', 'bankTransfer']).optional().nullable(),
		paymentMethod: z.enum(['cod', 'bankTransfer']),
		cart: z.object({
			products: z.array(
				z.object({
					product: z.number().int(),
					sku: z.string(),
					quantity: z.number().int().min(1),
				}),
			),
			discountCode: z.string().optional(),
		}),
		sendGift: z.object({
			sender: z.string().optional(),
			receiver: z.string().optional(),
			message: z.string().optional(),
		}),
	})
}
