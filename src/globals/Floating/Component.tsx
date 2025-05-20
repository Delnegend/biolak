import { FloatingGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_FloatingClient } from './Component.client'
import { FloatingGlobalSlug } from './config'

export async function FloatingGlobalComponent(): Promise<React.JSX.Element> {
	const global = (await getCachedGlobal(FloatingGlobalSlug, 1)()) as FloatingGlobal

	return <INTERNAL_FloatingClient global={global} />
}
