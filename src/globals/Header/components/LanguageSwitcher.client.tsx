'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { Lang } from '@/i18n/routing'

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
	const pathname = usePathname()
	const router = useRouter()
	const targetLocale = effectiveLocale === Lang.English ? Lang.Vietnamese : Lang.English

	return (
		<a
			href="#"
			onClick={(e) => {
				e.preventDefault()
				router.replace(pathname, { locale: targetLocale })
			}}
			className="whitespace-nowrap"
		>
			{label ?? <>{effectiveLocale === Lang.Vietnamese ? 'English' : 'Tiếng Việt'}</>}
		</a>
	)
}
