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
import { generateMeta } from '@/utilities/generateMeta'

import PageClient from './page.client'

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })

	const products = await payload.find({
		collection: ProductsSlug,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	return products.docs
		.map((doc) => doc.slug)
		.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug }))
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: ProductsSlug,
		draft,
		limit: 1,
		overrideAccess: false,
		pagination: false,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

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
			title: doc && 'title' in doc && doc.title ? doc.title : undefined,
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
		<article>
			<PageClient />
			<PayloadRedirects disableNotFound url={url} />
			{draft && <LivePreviewListener />}
			<ProductHero
				product={product}
				overrides={{
					subtitle: product.heroSubtitle,
					title: product.heroTitle,
					description: product.heroDescription,
				}}
			/>
			{product.content && <RenderBlocks blocks={product.content} />}

			{/* reviews */}
			{product.reviewsVisible === 'show' && <ReviewsGlobalComponent />}

			<FooterGlobalComponent size={product.footerSize} />
		</article>
	)
}
