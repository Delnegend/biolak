import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PostsSlug } from '@/collections/Posts/slug'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PostHero } from '@/heros/PostHero'

import { Post, PostCategory } from '@/payload-types'
import PageClient from './page.client'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export async function generateStaticParams() {
	const payload = await getPayload({ config })
	const posts = await payload.find({
		collection: PostsSlug,
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	return posts.docs
		.map((p) => p.slug)
		.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug }))
}

export default async function Blogs({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<React.JSX.Element> {
	const { isEnabled: draft } = await draftMode()
	const { slug: categorySlug = '' } = await params
	const payload = await getPayload({ config })
	const url = '/blogs/' + categorySlug
	const post = await queryPostCategoryBySlug({ slug: categorySlug })

	if (!post) return <PayloadRedirects url={url} />

	return (
		<article>
			<PageClient />
			<PayloadRedirects disableNotFound url={url} />
			{draft && <LivePreviewListener />}
			{/* TODO: add RenderBlocks */}
		</article>
	)
}

const queryPostCategoryBySlug = cache(async ({ slug: categorySlug }: { slug: string }): Promise<PostCategory | null> => {
	const payload = await getPayload({ config })

	const result = await payload.find({
		collection: PostCategoriesSlug,
		draft: false,
		where: {
			slug: {
				equals: categorySlug,
			},
		},
	})

	return result.docs?.[0] ?? null
})
