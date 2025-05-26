import type { Metadata } from 'next'

import type { Config, Media, Page, Post, Product } from '../payload-types'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

function getImageURL(image?: Media | Config['db']['defaultIDType'] | null): string {
	const serverUrl = getServerSideURL()

	let url = 'https://placehold.co/1280x720'

	if (image && typeof image === 'object' && 'url' in image) {
		const ogUrl = image.sizes?.og?.url

		url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
	}

	return url
}

export async function generateMeta(args: {
	doc: Partial<Page> | Partial<Post> | Partial<Product> | null
}): Promise<Metadata> {
	const { doc } = args
	const meta = doc?.meta?.meta

	const ogImage = getImageURL(
		meta && 'image' in meta && meta.image && typeof meta.image === 'object' ? meta.image : null,
	)
	const title = meta && 'title' in meta && meta.title ? `${meta.title} | BioLAK` : 'BioLAK'
	const description = meta && 'description' in meta && meta.description ? meta.description : ''

	return {
		description,
		openGraph: mergeOpenGraph({
			description,
			images: [
				{
					url: ogImage,
				},
			],
			title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
		}),
		title,
	}
}
