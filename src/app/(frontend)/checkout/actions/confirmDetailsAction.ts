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

export const ConfirmDetailsActionSchema = z.object({
	personalDetails: z
		.object({
			name: z.string().min(1, 'Name is required'),
			email: z.email().min(1, 'Email is required'),
			phoneNumber: z.string().min(1, 'Phone number is required'),
			city: z.enum(Object.keys(CITY_DISTRICT_WARD)),
			district: z.string().min(1, 'District is required'),
			ward: z.string().min(1, 'Ward is required'),
			houseNumber: z.string().min(1, 'House number is required'),
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
})

export async function confirmDetailsAction(input: unknown): Promise<
	| {
			success: true
	  }
	| {
			success: false
			error: string
	  }
> {
	const {
		ok: parsedInputOk,
		data: parsedInput,
		error: parsedInputError,
	} = tryCatchSync(() => ConfirmDetailsActionSchema.safeParse(input))
	if (!parsedInputOk) {
		if (parsedInputError instanceof z.ZodError) {
			return {
				success: false,
				error: parsedInputError.message,
			}
		}
		return {
			success: false,
			error: `${parsedInputError}`,
		}
	}

	const locale = await getClientLang()
	if (!parsedInput.data) {
		return {
			success: false,
			error: matchLang({
				[Lang.English]: 'Invalid input data',
				[Lang.Vietnamese]: 'Dữ liệu đầu vào không hợp lệ',
			})(locale),
		}
	}

	const { personalDetails } = parsedInput.data
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

	return { success: true }
}
