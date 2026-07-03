'use client'

import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

import {
	defaultLanguage,
	Language,
	type LanguageCode,
	PreferredLocaleCookieName,
} from '@/utilities/lang'

type LanguageContextType = {
	language: LanguageCode
	toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType>({
	language: defaultLanguage,
	toggleLanguage: () => {},
})

export function LanguageContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [language, setLanguage] = useState<LanguageCode>(() => {
		const cookieLang = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${PreferredLocaleCookieName}=`))
			?.split('=')[1] as LanguageCode | undefined

		return cookieLang && Object.values(Language).includes(cookieLang)
			? cookieLang
			: defaultLanguage
	})
	const router = useRouter()
	const toggleLanguage = () => {
		const newLanguage = language === Language.EN ? Language.VI : Language.EN
		document.cookie = `${PreferredLocaleCookieName}=${newLanguage}; path=/; max-age=31536000` // Expires in 1 year
		setLanguage(newLanguage)
		router.reload()
	}

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}

export function useLanguage(): LanguageContextType {
	const context = useContext(LanguageContext)
	if (!context) throw new Error('useLanguage must be used within a LanguageContextProvider')

	return context
}
