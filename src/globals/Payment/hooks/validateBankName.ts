import { getTranslations } from 'next-intl/server'
import { TextFieldSingleValidation } from 'payload'

export const validateBankName: TextFieldSingleValidation = async (value) => {
	const t = await getTranslations('globals.payment')
	const req = await fetch(`https://qr.sepay.vn/img?bank=${value}&acc=0`)

	const bodyString = await req.text()

	if (!req.ok || bodyString.includes('Failed to return content')) {
		return t('invalidBankName')
	}
	return true
}
