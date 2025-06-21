'use server'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies as getCookies } from 'next/headers'

import { defaultLocale, Lang, PreferredLocaleCookieName } from './lang'

/** ONLY FOR SERVER SIDE */
export async function getClientLang(cookies?: Promise<ReadonlyRequestCookies>): Promise<Lang> {
	try {
		return ((await (cookies ?? getCookies())).get(PreferredLocaleCookieName)?.value ??
			defaultLocale) as Lang
	} catch {
		return defaultLocale
	}
}
