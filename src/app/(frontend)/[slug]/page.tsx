import config from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PagesSlug } from '@/collections/Pages/slug'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { FooterGlobalComponent } from '@/globals/Footer/Component'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getClientLang } from '@/utilities/getClientLocale'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export async function generateStaticParams() {
	const [locale, { ok: payloadOk, data: payload, error: payloadError }] = await Promise.all([
		getClientLang(),
		tryCatch(() => getPayload({ config })),
	])

	if (!payloadOk) {
		throw new Error(`Failed to initialize Payload: ${payloadError}`)
	}

	const {
		ok: pagesOk,
		data: pages,
		error: pagesError,
	} = await tryCatch(() =>
		payload.find({
			collection: PagesSlug,
			draft: false,
			limit: 1000,
			pagination: false,
			select: {
				slug: true,
			},
			locale,
		}),
	)
	if (!pagesOk) {
		throw new Error(`Failed to fetch pages: ${pagesError}`)
	}

	return pages.docs
		?.filter((doc) => {
			return doc.slug !== 'home'
		})
		.map(({ slug }) => {
			return { slug }
		})
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: Args) {
	const { isEnabled: draft } = await draftMode()
	const { slug = 'home' } = await paramsPromise
	const url = '/' + slug

	const page = await queryPageBySlug({ slug })

	if (!page) {
		return <PayloadRedirects url={url} />
	}

	return (
		<article>
			<PageClient />
			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			{draft && <LivePreviewListener />}

			<RenderHero {...page.hero} />
			<RenderBlocks blocks={page.pageLayout} />
			<FooterGlobalComponent size={page.footerSize} />
		</article>
	)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = 'home' } = await paramsPromise
	const page = await queryPageBySlug({
		slug,
	})

	return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const [{ isEnabled: draft }, locale, { data: payload, ok: payloadOk, error: payloadError }] =
		await Promise.all([draftMode(), getClientLang(), tryCatch(() => getPayload({ config }))])

	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)

	const result = await payload.find({
		collection: PagesSlug,
		draft,
		limit: 1,
		pagination: false,
		overrideAccess: draft,
		where: {
			slug: {
				equals: slug,
			},
		},
		locale,
	})

	return result.docs?.[0] || null
})
