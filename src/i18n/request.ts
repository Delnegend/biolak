import { getRequestConfig } from 'next-intl/server'

import type { Lang } from '@/utilities/lang'

import { routing } from './routing'

type Messages = typeof import('../../messages/en.json').default

const messageImports: Record<string, () => Promise<{ default: Messages }>> = {
	en: () => import('../../messages/en.json'),
	vi: () => import('../../messages/vi.json'),
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale
	if (!locale || !routing.locales.includes(locale as never)) {
		locale = routing.defaultLocale
	}

	const load = messageImports[locale]
	if (!load) {
		return { locale, messages: (await messageImports.en!()).default }
	}

	return {
		locale,
		messages: (await load()).default,
	}
})
