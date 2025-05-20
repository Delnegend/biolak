import config from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { FooterGlobalComponent } from '@/globals/Footer/Component'
import { type PostCategory } from '@/payload-types'

import PageClient from './page.client'

export async function generateStaticParams() {
	const payload = await getPayload({ config })
	const postCategories = await payload.find({
		collection: PostCategoriesSlug,
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	return postCategories.docs
		.map((c) => c.slug)
		.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug }))
}

export default async function PostCategory({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<React.JSX.Element> {
	const { isEnabled: draft } = await draftMode()
	const { slug: categorySlug = '' } = await params
	const url = '/posts/' + categorySlug
	const postCategory = await queryPostCategoryBySlug({ slug: categorySlug })

	if (!postCategory) return <PayloadRedirects url={url} />

	return (
		<article>
			<PageClient />
			<PayloadRedirects disableNotFound url={url} />
			{draft && <LivePreviewListener />}
			<RenderBlocks blocks={postCategory.layout} />
			<FooterGlobalComponent size={postCategory.footerSize} />
		</article>
	)
}

const queryPostCategoryBySlug = cache(
	async ({ slug: categorySlug }: { slug: string }): Promise<PostCategory | null> => {
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
	},
)

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<Metadata> {
	const { slug = '' } = await params
	const postCategory = await queryPostCategoryBySlug({ slug })

	return {
		title: postCategory?.title ? `${postCategory.title} | BioLAK` : 'Các bài đăng | BioLAK',
	}
}
