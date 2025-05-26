import { defaultLocale, Lang } from './lang'

export function matchLang(
	translations: Record<Lang, string>,
): ({ locale }: { locale: Lang }) => string {
	return ({ locale }: { locale: Lang }): string => {
		const t = translations[locale]
		if (t) return t
		const fallback = translations[defaultLocale]
		if (fallback) return fallback

		throw new Error(
			`No translation found for locale ${locale}, available locales: ${Object.keys(translations).join(', ')}`,
		)
	}
}
