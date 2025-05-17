import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	posts: '/posts',
	pages: '',
}

type Props = {
	collection: keyof typeof collectionPrefixMap
	slug: string
	req: PayloadRequest
}

export function generatePreviewPath({ collection, slug }: Props): string {
	const encodedParams = new URLSearchParams({
		slug,
		collection,
		path: `${collectionPrefixMap[collection]}/${slug}`,
		previewSecret: process.env.PREVIEW_SECRET || '',
	})

	const url = `/next/preview?${encodedParams.toString()}`

	return url
}
