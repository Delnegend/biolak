import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PostsSlug } from '@/collections/Posts/slug'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { FooterGlobalComponent } from '@/globals/Footer/Component'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getClientLang } from '@/utilities/getClientLocale'

import PageClient from './page.client'

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const locale = await getClientLang()

	const posts = await payload.find({
		collection: PostsSlug,
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
		locale,
	})

	return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Post({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { slug = '' } = await paramsPromise
	const url = '/post/' + slug
	const post = await queryPostBySlug({ slug })

	if (!post) return <PayloadRedirects url={url} />

	return (
		<article>
			<PageClient />

			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			<PostHero post={post} />

			<div className="mt-8 items-center">
				<RenderBlocks blocks={post.postLayout} post={post} />
				{post.relatedPosts && post.relatedPosts.length > 0 && (
					<RelatedPosts
						className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
						docs={post.relatedPosts.filter((post) => typeof post === 'object')}
					/>
				)}
			</div>

			<FooterGlobalComponent size={post.footerSize} />
		</article>
	)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = '' } = await paramsPromise
	const post = await queryPostBySlug({ slug })

	return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()
	const payload = await getPayload({ config: configPromise })
	const locale = await getClientLang()

	const result = await payload.find({
		collection: PostsSlug,
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			slug: {
				equals: slug,
			},
		},
		locale,
	})

	return result.docs?.[0] || null
})
