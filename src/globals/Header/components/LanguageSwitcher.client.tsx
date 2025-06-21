'use client'

import React from 'react'

import { Lang, PreferredLocaleCookieName } from '@/utilities/lang'

export function INTERNAL_LanguageSwitcher({
	label,
	locale,
}: {
	label?: string
	locale: Lang
}): React.JSX.Element {
	return (
		<button
			onClick={() => {
				document.cookie = `${PreferredLocaleCookieName}=${locale === Lang.English ? Lang.Vietnamese : Lang.English}; path=/`
				window.location.reload()
			}}
		>
			{label ?? <>{locale === Lang.Vietnamese ? 'English' : 'Tiếng Việt'}</>}
		</button>
	)
}
