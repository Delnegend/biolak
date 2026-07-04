import { getRequestConfig } from 'next-intl/server'

import en from '../../messages/en.json'
import vi from '../../messages/vi.json'
import { routing } from './routing'

type Messages = typeof en

const messages: Record<string, Messages> = { en, vi }

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale
	if (!locale || !routing.locales.includes(locale as never)) {
		locale = routing.defaultLocale
	}

	return {
		locale,
		messages: messages[locale] ?? messages[routing.defaultLocale],
	}
})
