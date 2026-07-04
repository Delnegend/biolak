import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export enum Lang {
	English = 'en',
	Vietnamese = 'vi',
}

export const defaultLocale = Lang.Vietnamese

export const routing = defineRouting({
	locales: [Lang.English, Lang.Vietnamese] as const,
	defaultLocale,
	localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
