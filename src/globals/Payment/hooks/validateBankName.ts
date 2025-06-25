import { TextFieldSingleValidation } from 'payload'

import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const validateBankName: TextFieldSingleValidation = async (value, ctx) => {
	const locale = ctx.req.locale === Lang.English ? Lang.English : Lang.Vietnamese
	const req = await fetch(`https://qr.sepay.vn/img?bank=${value}&acc=0`)

	const bodyString = await req.text()

	if (!req.ok || bodyString.includes('Failed to return content')) {
		return matchLang({
			[Lang.English]: 'Invalid bank name or unsupported by Sepay',
			[Lang.Vietnamese]: 'Tên ngân hàng không hợp lệ hoặc không được Sepay hỗ trợ',
		})(locale)
	}
	return true
}
