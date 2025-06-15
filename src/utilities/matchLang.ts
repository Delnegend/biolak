import { defaultLocale, Lang } from './lang'

export function matchLang(
	translations: Record<Lang, string>,
): (props?: { locale?: Lang } | Lang) => string {
	return function matchLangInner(props?: { locale?: Lang } | Lang): string {
		if (typeof props === 'string') {
			const locale = (props as Lang | undefined) ?? defaultLocale
			return translations[locale] ?? ''
		}
		const locale = props?.locale ?? defaultLocale
		const t = translations[locale]
		if (t) return t
		const fallback = translations[defaultLocale]
		if (fallback) return fallback

		throw new Error(
			`No translation found for locale ${locale}, available locales: ${Object.keys(translations).join(', ')}`,
		)
	}
}
