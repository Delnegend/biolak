import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { defaultLocale, Lang } from '@/utilities/lang'

export const routing = defineRouting({
	locales: [Lang.English, Lang.Vietnamese] as const,
	defaultLocale,
	localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
