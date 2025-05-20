import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	[PostsSlug]: '/post',
	[PostCategoriesSlug]: '/posts',
	[PagesSlug]: '',
	[ProductsSlug]: '/product',
	[ProductCategoriesSlug]: '/category',
	[ProductSubCategoriesSlug]: '/category',
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
