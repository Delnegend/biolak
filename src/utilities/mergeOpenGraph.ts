import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { GeneralGlobalSlug } from '@/globals/General/config'
import { GeneralGlobal } from '@/payload-types'

import { cnsoleBuilder } from './cnsole'
import { depthHandler } from './depthHandler'
import { getCachedGlobal } from './getGlobals'
import { tryCatch } from './tryCatch'

const cnsole = cnsoleBuilder('mergeOpenGraph')

export async function mergeOpenGraph(og?: Metadata['openGraph']): Promise<Metadata['openGraph']> {
	const generalGlobal = await getCachedGlobal<GeneralGlobal>(GeneralGlobalSlug)()
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) cnsole.error(`Failed to initialize Payload: ${payloadError}`)

	const {
		data: siteBanner,
		ok: siteBannerOk,
		error: siteBannerError,
	} = await depthHandler({
		data: generalGlobal.siteBanner,
		fetch: (id) =>
			payloadOk
				? payload.findByID({
						id,
						collection: MediaSlug,
						depth: 0,
					})
				: null,
	})
	if (!siteBannerOk) cnsole.error(`Failed to fetch site banner: ${siteBannerError}`)

	return {
		...{
			type: 'website',
			description: 'An open-source website built with Payload and Next.js.',
			images: [
				{
					url: siteBanner?.url ?? 'https://placehold.co/1280x720',
				},
			],
			siteName: 'BioLAK',
			title: 'BioLAK',
		},
		...og,
		images: og?.images ?? {
			url: siteBanner?.url ?? 'https://placehold.co/1280x720',
		},
	}
}
