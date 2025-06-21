import { FloatingGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_FloatingClient } from './Component.client'
import { FloatingGlobalSlug } from './config'

export async function FloatingGlobalComponent(): Promise<React.JSX.Element> {
	const locale = await getClientLang()
	const global = await getCachedGlobal<FloatingGlobal>(FloatingGlobalSlug, 1, locale)()

	return <INTERNAL_FloatingClient global={global} locale={locale} />
}
