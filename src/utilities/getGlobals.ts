import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Config } from 'src/payload-types'

import { defaultLocale, Lang } from './lang'

type Global = keyof Config['globals']

async function getGlobal<T = unknown>(slug: Global, depth = 0, locale?: Lang | 'all') {
	const payload = await getPayload({ config: configPromise })

	return payload.findGlobal({
		slug,
		depth,
		locale,
		fallbackLocale: defaultLocale,
	}) as Promise<T>
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export function getCachedGlobal<T>(slug: Global, depth = 0, locale?: Lang | 'all') {
	return unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale ?? ''], {
		tags: [slug],
	})
}
