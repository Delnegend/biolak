'use server'
import { z } from 'zod/v4'

import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatchSync } from '@/utilities/tryCatch'

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
