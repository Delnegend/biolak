import configPromise from '@payload-config'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { ProductCard } from '@/components/ProductCard'
import { generateMeta } from '@/utilities/generateMeta'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const locale = await getClientLang()

	const categories = await payload.find({
		collection: ProductCategoriesSlug,
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
		locale,
	})

	return categories.docs
		.map((doc) => doc.slug)
		.filter((slug) => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug }))
}

export default async function Category({
	params,
}: {
	params: Promise<{ slug?: string }>
}): Promise<React.JSX.Element> {
	const { slug: categorySlug = '' } = await params
	const locale = await getClientLang()
	const { data, ok, error } = await tryCatch(() =>
		Promise.all([
			getPayload({ config: configPromise }),
			queryCategoryBySlug({ slug: categorySlug }),
		]),
	)
	if (!ok) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>
					{matchLang({
						[Lang.English]: 'Error fetching category',
						[Lang.Vietnamese]: 'Lỗi khi lấy danh mục',
					})(locale)}
					<div>{`${error}`}</div>
				</h2>
			</div>
		)
	}

	const [payload, category] = data

	const {
		data: products,
		error: productsError,
		ok: productsOk,
	} = await tryCatch(() =>
		payload.find({
			collection: ProductsSlug,
			where: {
				or: [
					{
						[`${ProductCategoriesSlug}.slug`]: {
							equals: categorySlug,
						},
					},
					{
						[`${ProductSubCategoriesSlug}.slug`]: {
							equals: categorySlug,
						},
					},
				],
			},
			select: {
				title: true,
				slug: true,
				shortDescription: true,
				gallery: true,
				price: true,
				variants: true,
			},
			limit: 1000,
			pagination: false,
			overrideAccess: false,
		}),
	)

	if (!productsOk) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>
					{matchLang({
						[Lang.English]: 'Error fetching products for this category',
						[Lang.Vietnamese]: 'Lỗi khi lấy sản phẩm cho danh mục này',
					})(locale)}
					<div>{`${productsError}`}</div>
				</h2>
			</div>
		)
	}

	if (!products || products?.docs.length === 0) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>
					{matchLang({
						[Lang.English]: 'No products found in this category',
						[Lang.Vietnamese]: 'Không tìm thấy sản phẩm trong danh mục này',
					})(locale)}
				</h2>
			</div>
		)
	}

	return (
		<div className="safe-width mb-12 mt-24 flex flex-row">
			<PageClient />
			<div className="mr-[8.75rem] font-serif text-5xl font-semibold italic text-primary">
				{category?.title ??
					matchLang({
						[Lang.English]: 'Category not found',
						[Lang.Vietnamese]: 'Không tìm thấy danh mục',
					})(locale)}
			</div>
			<div className="flex flex-row flex-wrap gap-6">
				{products.docs.map((p) => (
					<ProductCard product={p} key={p.slug} size="sm" />
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
	const locale = await getClientLang()

	let result = await payload.find({
		collection: ProductCategoriesSlug,
		overrideAccess: false,
		where: {
			slug: {
				equals: categorySlug,
			},
		},
		locale,
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
			locale,
		})
	}

	return result.docs?.[0] || null
})
