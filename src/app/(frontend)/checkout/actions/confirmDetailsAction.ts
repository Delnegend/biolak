import { z } from 'zod/v4'

import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatchSync } from '@/utilities/tryCatch'

import CITY_DISTRICT_WARD from './city-district-ward.json'

interface CityDistrictWard {
	[key: string]: {
		[key: string]: string[]
	}
}

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
				email: z
					.string()
					.email()
					.min(
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
			})
			.required(),
		transportationMethod: z.enum(['standard', 'express']),
		paymentMethod: z.enum(['cod', 'bankTransfer']),
		sendGift: z
			.object({
				sender: z.string().optional(),
				receiver: z.string().optional(),
				message: z.string().max(1000).optional(),
			})
			.optional(),
		discountCode: z.string().optional(),
	})
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
	const { city, district, ward } = personalDetails
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

	console.log('Confirmed details:', parsedInput)

	return { success: true }
}
