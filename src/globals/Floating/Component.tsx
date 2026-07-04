import { Lang } from '@/i18n/routing'
import { FloatingGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_FloatingClient } from './Component.client'
import { FloatingGlobalSlug } from './config'

export async function FloatingGlobalComponent({
	locale,
}: {
	locale: Lang
}): Promise<React.JSX.Element> {
	const global = await getCachedGlobal<FloatingGlobal>(FloatingGlobalSlug, 1, locale)()

	return <INTERNAL_FloatingClient global={global} />
}
