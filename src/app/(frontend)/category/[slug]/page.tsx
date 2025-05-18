import configPromise from '@payload-config'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { ProductCard } from '@/components/ProductCard'
import { generateMeta } from '@/utilities/generateMeta'

import PageClient from './page.client'

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const categories = await payload.find({
		collection: ProductCategoriesSlug,
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	return categories.docs
		.map((doc) => doc.slug)
		.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug }))
}

export default async function Category({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<React.JSX.Element> {
	const { slug: categorySlug = '' } = await params
	const payload = await getPayload({ config: configPromise })

	const category = await queryCategoryBySlug({ slug: categorySlug })

	let products
	try {
		products = await payload.find({
			collection: ProductsSlug,
			overrideAccess: false,
			where: {
				[`${ProductCategoriesSlug}.slug`]: {
					equals: categorySlug,
				},
			},
			select: {
				title: true,
				slug: true,
				shortDescription: true,
				gallery: true,
				price: true,
			},
		})
		if (products.docs.length === 0) {
			products = await payload.find({
				collection: ProductsSlug,
				overrideAccess: false,
				where: {
					[`${ProductSubCategoriesSlug}.slug`]: {
						equals: categorySlug,
					},
				},
				select: {
					title: true,
					slug: true,
					shortDescription: true,
					gallery: true,
					price: true,
				},
			})
		}
	} catch (error) {
		console.error(`Can't fetch products for category slug "${categorySlug}":`, error)
	}

	return (
		<div className="safe-width mb-12 mt-24 flex flex-row">
			<PageClient />
			<div className="mr-[8.75rem] font-serif text-5xl font-semibold italic text-primary">
				{category?.title ?? 'Sản phẩm'}
			</div>
			<div className="flex flex-row flex-wrap gap-6">
				{products?.docs.map((product) => (
					<ProductCard product={product} key={product.slug} size="sm" />
				))}
			</div>
		</div>
	)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<Metadata> {
	return generateMeta({
		doc: await queryCategoryBySlug({ slug: (await params).slug ?? '' }),
	})
}

const queryCategoryBySlug = cache(async ({ slug: categorySlug }: { slug: string }) => {
	const payload = await getPayload({ config: configPromise })

	let result = await payload.find({
		collection: ProductCategoriesSlug,
		overrideAccess: false,
		where: {
			slug: {
				equals: categorySlug,
			},
		},
	})

	if (result.docs.length === 0) {
		result = await payload.find({
			collection: ProductSubCategoriesSlug,
			overrideAccess: false,
			where: {
				slug: {
					equals: categorySlug,
				},
			},
		})
	}

	return result.docs?.[0] || null
})
