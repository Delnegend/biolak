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
import { defaultLocale, Lang } from '@/i18n/routing'
import { type PostCategory } from '@/payload-types'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export async function generateStaticParams() {
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)

	const {
		data: postCategories,
		ok: postCategoriesOk,
		error: postCategoriesError,
	} = await tryCatch(() =>
		payload.find({
			collection: PostCategoriesSlug,
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
	if (!postCategoriesOk)
		throw new Error(`Failed to fetch post categories: ${postCategoriesError}`)

	return postCategories.docs.map((c) => c.slug).map((slug) => ({ slug: slug ?? '' }))
}

export default async function PostCategory({
	params,
}: {
	params: Promise<{ slug?: string; locale: string }>
}): Promise<React.JSX.Element> {
	const { isEnabled: draft } = await draftMode()
	const { slug: categorySlug = '', locale: _locale } = await params
	const locale = _locale as Lang
	const url = '/posts/' + categorySlug
	const postCategory = await queryPostCategoryBySlug({ slug: categorySlug, locale })

	if (!postCategory) return <PayloadRedirects url={url} />

	return (
		<article>
			<PageClient />
			<PayloadRedirects disableNotFound url={url} />
			{draft && <LivePreviewListener />}
			<RenderBlocks
				blocks={postCategory.postCategoryLayout}
				postCategory={postCategory}
				locale={locale}
			/>
			<FooterGlobalComponent size={postCategory.footerSize} locale={locale} />
		</article>
	)
}

const queryPostCategoryBySlug = cache(
	async ({
		slug: categorySlug,
		locale,
	}: {
		slug: string
		locale: Lang
	}): Promise<PostCategory | null> => {
		const {
			data: payload,
			ok: payloadOk,
			error: payloadError,
		} = await tryCatch(() => getPayload({ config }))
		if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)

		const {
			data: result,
			ok: resultOk,
			error: resultError,
		} = await tryCatch(() =>
			payload.find({
				collection: PostCategoriesSlug,
				draft: false,
				where: {
					slug: {
						equals: categorySlug,
					},
				},
				locale,
			}),
		)
		if (!resultOk)
			throw new Error(
				`Failed to fetch post category by slug "${categorySlug}": ${resultError}`,
			)

		return result.docs?.[0] ?? null
	},
)

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string; locale: string }>
}): Promise<Metadata> {
	const { slug = '', locale: _locale } = await params
	const locale = _locale as Lang
	const postCategory = await queryPostCategoryBySlug({ slug, locale })

	return {
		title: postCategory?.title ? `${postCategory.title} | BioLAK` : 'Các bài đăng | BioLAK',
	}
}
