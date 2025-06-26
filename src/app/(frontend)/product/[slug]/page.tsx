import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { ProductsSlug } from '@/collections/Products/slug'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { FooterGlobalComponent } from '@/globals/Footer/Component'
import { ReviewsGlobalComponent } from '@/globals/Reviews/Component'
import { ProductHero } from '@/heros/ProductHero'
import { ProductVariantContextProvider } from '@/heros/ProductHero/ProductVariantContext'
import { generateMeta } from '@/utilities/generateMeta'
import { getClientLang } from '@/utilities/getClientLocale'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export async function generateStaticParams() {
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config: configPromise }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)
	const locale = await getClientLang()

	const {
		data: products,
		ok: productsOk,
		error: productsError,
	} = await tryCatch(() =>
		payload.find({
			collection: ProductsSlug,
			limit: 1000,
			overrideAccess: false,
			pagination: false,
			select: {
				slug: true,
			},
			locale,
		}),
	)
	if (!productsOk) throw new Error(`Failed to fetch products: ${productsError}`)

	return products.docs.map((doc) => doc.slug).map((slug) => ({ slug: slug ?? '' }))
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()
	const {
		data: payload,
		ok: payloadOk,
		error: payloadError,
	} = await tryCatch(() => getPayload({ config: configPromise }))
	if (!payloadOk) throw new Error(`Failed to initialize Payload: ${payloadError}`)
	const locale = await getClientLang()

	const {
		data: result,
		ok: resultOk,
		error: resultError,
	} = await tryCatch(() =>
		payload.find({
			collection: ProductsSlug,
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
	if (!resultOk) throw new Error(`Failed to fetch product by slug "${slug}": ${resultError}`)

	return result.docs?.[0] || null
})

export async function generateMetadata({
	params: paramsPromise,
}: {
	params: Promise<{ slug?: string }>
}) {
	const { slug = '' } = await paramsPromise
	const doc = await queryProductBySlug({ slug })
	return generateMeta({
		doc: {
			...doc,
			title: doc?.title,
		},
	})
}

export default async function Product({
	params: paramsPromise,
}: {
	params: Promise<{ slug?: string }>
}) {
	const { isEnabled: draft } = await draftMode()
	const { slug = '' } = await paramsPromise
	const url = '/product/' + slug
	const product = await queryProductBySlug({ slug })

	if (!product) return <PayloadRedirects url={url} />

	return (
		<ProductVariantContextProvider>
			<article>
				<PageClient />
				<PayloadRedirects disableNotFound url={url} />
				{draft && <LivePreviewListener />}
				<ProductHero product={product} />
				<RenderBlocks blocks={product.productLayout} product={product} />

				{/* reviews */}
				{product.reviewsVisible === 'show' && (
					<ReviewsGlobalComponent
						ordersWithRating={
							product.orders?.docs
								? product.orders?.docs
										.filter((o) => typeof o === 'object')
										.filter((o) => o.review?.approved)
								: null
						}
					/>
				)}

				<FooterGlobalComponent size={product.footerSize} />
			</article>
		</ProductVariantContextProvider>
	)
}
