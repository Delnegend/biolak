'use client'

import React from 'react'

import { useClientLang } from '@/hooks/useClientLang'
import { Lang } from '@/utilities/lang'

export function INTERNAL_LanguageSwitcher({ label }: { label?: string }): React.JSX.Element {
	const { lang, setLang } = useClientLang()
	return (
		<button
			onClick={() => {
				if (lang === Lang.Vietnamese) {
					setLang(Lang.English)
				} else {
					setLang(Lang.Vietnamese)
				}
				window.location.reload()
			}}
		>
			{label ?? <>{lang === Lang.Vietnamese ? 'English' : 'Tiếng Việt'}</>}
		</button>
	)
}
