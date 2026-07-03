export enum Lang {
	English = 'en',
	Vietnamese = 'vi',
}

export type LanguageCode = Lang

export const Language = {
	EN: Lang.English,
	VI: Lang.Vietnamese,
} as const

export const defaultLanguage = Lang.English

export const defaultLocale = Lang.Vietnamese

export const PreferredLocaleCookieName = 'preferred-locale'
