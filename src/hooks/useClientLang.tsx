'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { defaultLocale, Lang, PreferredLocaleCookieName } from '@/utilities/lang'

const clientLangContext = createContext<{
	lang: Lang
	setLang: (newLang: Lang) => void
} | null>(null)

export function ClientLangContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [lang, setLang] = useState(defaultLocale)

	useEffect(() => {
		try {
			const langInCookie = document.cookie
				.split('; ')
				.find((row) => row.startsWith(`${PreferredLocaleCookieName}=`))
				?.split('=')[1] as Lang | undefined

			if (langInCookie && [Lang.Vietnamese, Lang.English].includes(langInCookie)) {
				setLang(langInCookie)
			}
		} catch {
			setLang(defaultLocale)
			document.cookie = `${PreferredLocaleCookieName}=${defaultLocale}; path=/`
		}
	}, [])

	return (
		<clientLangContext.Provider
			value={{
				lang,
				setLang(newLang: Lang) {
					if (!newLang || ![Lang.Vietnamese, Lang.English].includes(newLang)) return
					document.cookie = `${PreferredLocaleCookieName}=${newLang}; path=/`
					window.location.reload()
				},
			}}
		>
			{children}
		</clientLangContext.Provider>
	)
}

/** ONLY FOR CLIENT SIDE */
export function useClientLang(): {
	lang: Lang
	setLang: (newLang: Lang) => void
} {
	const context = useContext(clientLangContext)
	if (!context) {
		throw new Error('useClientLang must be used within a ClientLangContextProvider')
	}
	return context
}
