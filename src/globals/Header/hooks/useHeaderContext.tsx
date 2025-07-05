'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type HeaderContextType = {
	allTopBarsHeight: number
	smallNavOpen: boolean
	setSmallNavOpen: (open: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | null>(null)

export function HeaderProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
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

	return (
		<HeaderContext.Provider
			value={{
				allTopBarsHeight,
				smallNavOpen,
				setSmallNavOpen,
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
