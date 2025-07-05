import type { HeaderGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_LargeNav } from './blocks/LargeNav'
import { INTERNAL_SmallNav } from './blocks/SmallNav'
import { HeaderProvider } from './hooks/useHeaderContext'
import { HeaderGlobalSlug } from './slug'

export async function HeaderGlobalComponent() {
	const locale = await getClientLang()
	const global = await getCachedGlobal<HeaderGlobal>(HeaderGlobalSlug, 1, locale)()

	return (
		<HeaderProvider>
			<header className="sticky top-0 z-20 flex h-20 w-full items-center bg-primary-foreground px-4 lg:px-10">
				<INTERNAL_LargeNav locale={locale} global={global} className="max-lg:hidden" />
				<INTERNAL_SmallNav locale={locale} global={global} className="lg:hidden" />
			</header>
		</HeaderProvider>
	)
}
