'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { defaultLocale, Lang, PreferredLocaleCookieName } from '@/utilities/lang'

const LangContext = createContext<{
	lang: Lang
	setLang: (lang: Lang) => void
} | null>(null)

/** ONLY FOR CLIENT SIDE */
export function useClientLang() {
	const context = useContext(LangContext)
	if (!context) throw new Error('useClientLang must be used within a LangContextProvider')
	return context
}

export function LangContextProviderClient({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [lang, setLang_] = useState<Lang>(defaultLocale)

	useEffect(() => {
		const cookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${PreferredLocaleCookieName}=`))
		if (cookie) {
			const lang = cookie.split('=')[1]
			setLang(lang as Lang)
		}
	}, [])

	function setLang(lang: Lang): void {
		setLang_(lang)
		document.cookie = `${PreferredLocaleCookieName}=${lang}`
	}

	return (
		<LangContext.Provider
			value={{
				lang,
				setLang,
			}}
		>
			{children}
		</LangContext.Provider>
	)
}
