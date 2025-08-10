import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { GeneralGlobalSlug } from '@/globals/General/config'

import { GeneralGlobal, type Page, type Post, type Product } from '../payload-types'
import { depthHandler } from './depthHandler'
import { getCachedGlobal } from './getGlobals'
import { tryCatch } from './tryCatch'

export async function generateMeta(args: {
	doc: Partial<Page> | Partial<Post> | Partial<Product> | null
}): Promise<Metadata> {
	const meta = args.doc?.meta?.meta

	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)
	const generalGlobal = await getCachedGlobal<GeneralGlobal>(GeneralGlobalSlug)()

	const product = args.doc as Partial<Product>
	const productImg = !!product.gallery ? product.gallery[0] : null

	const img = await depthHandler({
		data: meta?.image ?? productImg ?? generalGlobal.siteBanner,
		fetch: (id) =>
			payload.findByID({
				id,
				collection: MediaSlug,
				depth: 0,
			}),
	})
	const title = !!meta?.title ? `${meta.title} | BioLAK` : 'BioLAK'
	const description = meta?.description ?? generalGlobal.description ?? ''

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			images: [
				{
					url: !!img.data?.url ? img.data?.url : 'https://placehold.co/1280x720',
				},
			],
			url: Array.isArray(args.doc?.slug) ? args.doc?.slug.join('/') : '/',
			siteName: 'BioLAK',
		},
	}
}
