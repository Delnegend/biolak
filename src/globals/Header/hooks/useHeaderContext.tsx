'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Lang } from '@/i18n/routing'

type HeaderContextType = {
	allTopBarsHeight: number
	smallNavOpen: boolean
	setSmallNavOpen: (open: boolean) => void
	locale: Lang
}

const HeaderContext = createContext<HeaderContextType | null>(null)

export function HeaderProvider({
	children,
	initialLocale,
}: {
	children: React.ReactNode
	initialLocale?: Lang
}): React.JSX.Element {
	const [allTopBarsHeight, setAllTopBarsHeight] = useState(0)
	function refresh(): void {
		const header = document.querySelector('body > header')
		if (header) setAllTopBarsHeight(header.getBoundingClientRect().bottom)
	}
	useEffect(() => {
		const timeoutId = setTimeout(refresh, 1000)
		const controller = new AbortController()
		window.addEventListener('scroll', refresh, { signal: controller.signal })
		window.addEventListener('resize', refresh, { signal: controller.signal })

		return () => {
			controller.abort()
			clearTimeout(timeoutId)
		}
	}, [])

	const [smallNavOpen, setSmallNavOpen] = useState(false)

	const [locale] = useState<Lang>(initialLocale ?? (Lang.Vietnamese as Lang))

	return (
		<HeaderContext.Provider
			value={{
				allTopBarsHeight,
				smallNavOpen,
				setSmallNavOpen,
				locale,
			}}
		>
			{children}
		</HeaderContext.Provider>
	)
}

export function useHeaderContext(): HeaderContextType {
	const context = useContext(HeaderContext)
	if (!context) throw new Error('useHeaderContext must be used within a HeaderProvider')
	return context
}
