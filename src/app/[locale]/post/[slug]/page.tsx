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
import { defaultLocale, Lang } from '@/i18n/routing'
import { generateMeta } from '@/utilities/generateMeta'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export async function generateStaticParams() {
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config: configPromise }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)

	const {
		data: posts,
		ok: postsOk,
		error: postsError,
	} = await tryCatch(() =>
		payload.find({
			collection: PostsSlug,
			draft: false,
			limit: 1000,
			overrideAccess: false,
			pagination: false,
			select: {
				slug: true,
			},
			locale: defaultLocale,
		}),
	)
	if (!postsOk) throw new Error(`Failed to fetch posts: ${postsError}`)

	return posts.docs.map(({ slug }) => ({ slug: slug ?? '' }))
}

type Args = {
	params: Promise<{
		slug?: string
		locale: string
	}>
}

export default async function Post({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { slug = '', locale: _locale } = await paramsPromise
	const locale = _locale as Lang
	const url = '/post/' + slug
	const post = await queryPostBySlug({ slug, locale })

	if (!post) return <PayloadRedirects url={url} />

	return (
		<article>
			<PageClient />

			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			<PostHero post={post} />

			<div className="mt-8 items-center">
				<RenderBlocks blocks={post.postLayout} post={post} locale={locale} />
				{post.relatedPosts && post.relatedPosts.length > 0 && (
					<RelatedPosts
						className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
						docs={post.relatedPosts.filter((post) => typeof post === 'object')}
						locale={locale}
					/>
				)}
			</div>

			<FooterGlobalComponent size={post.footerSize} locale={locale} />
		</article>
	)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = '', locale: _locale } = await paramsPromise
	const locale = _locale as Lang
	const post = await queryPostBySlug({ slug, locale })

	return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: Lang }) => {
	const { isEnabled: draft } = await draftMode()
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config: configPromise }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)

	const {
		data: result,
		ok: resultOk,
		error: resultError,
	} = await tryCatch(() =>
		payload.find({
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
		}),
	)
	if (!resultOk) throw new Error(`Failed to fetch post by slug "${slug}": ${resultError}`)

	return result.docs?.[0] || null
})
