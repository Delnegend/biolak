'use client'

import React from 'react'

import { Lang, PreferredLocaleCookieName } from '@/utilities/lang'

import { useHeaderContext } from '../hooks/useHeaderContext'

export function INTERNAL_LanguageSwitcher({
	label,
	locale,
}: {
	label?: string
	locale?: Lang
}): React.JSX.Element {
	const { locale: ctxLocale } = useHeaderContext()
	const effectiveLocale = locale ?? ctxLocale

	return (
		<a
			href="#"
			onClick={(e) => {
				e.preventDefault()
				document.cookie = `${PreferredLocaleCookieName}=${
					effectiveLocale === Lang.English ? Lang.Vietnamese : Lang.English
				}; path=/`
				window.location.reload()
			}}
			className="whitespace-nowrap"
		>
			{label ?? <>{effectiveLocale === Lang.Vietnamese ? 'English' : 'Tiếng Việt'}</>}
		</a>
	)
}
