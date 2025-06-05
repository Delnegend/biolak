import { defaultLocale, Lang } from './lang'

export function matchLang(
	translations: Record<Lang, string>,
): (props: { locale: Lang } | Lang) => string {
	return function matchLangInner(props: { locale: Lang } | Lang): string {
		if (typeof props === 'string') {
			return translations[props as Lang] ?? translations[defaultLocale] ?? ''
		}
		const { locale } = props
		const t = translations[locale]
		if (t) return t
		const fallback = translations[defaultLocale]
		if (fallback) return fallback

		throw new Error(
			`No translation found for locale ${locale}, available locales: ${Object.keys(translations).join(', ')}`,
		)
	}
}
