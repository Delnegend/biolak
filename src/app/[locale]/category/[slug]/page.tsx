import configPromise from '@payload-config'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import { cache } from 'react'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { ProductCard } from '@/components/ProductCard'
import { Lang } from '@/i18n/routing'
import { generateMeta } from '@/utilities/generateMeta'
import { tryCatch } from '@/utilities/tryCatch'

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
		.filter((slug) => typeof slug === 'string' && slug.length > 0)
		.map((slug) => ({ slug: slug ?? '' }))
}

export default async function Category({
	params,
}: {
	params: Promise<{ slug?: string; locale: string }>
}): Promise<React.JSX.Element> {
	const { slug: categorySlug = '', locale: _locale } = await params
	const locale = _locale as Lang
	const t = await getTranslations('app.category')
	const { data, ok, error } = await tryCatch(() =>
		Promise.all([
			getPayload({ config: configPromise }),
			queryCategoryBySlug({ slug: categorySlug, locale }),
		]),
	)
	if (!ok) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>
					{t('errorFetching')}
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
			locale,
		}),
	)

	if (!productsOk) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>
					{t('errorFetchingProducts')}
					<div>{`${productsError}`}</div>
				</h2>
			</div>
		)
	}

	if (!products || products?.docs.length === 0) {
		return (
			<div className="safe-width my-24 text-center text-primary">
				<h2>{t('noProducts')}</h2>
			</div>
		)
	}

	return (
		<div className="safe-width my-6 flex flex-col justify-between max-lg:items-center lg:mb-12 lg:mt-24 lg:flex-row lg:gap-16 xl:gap-[8.75rem]">
			<PageClient />
			<div className="font-serif text-5xl font-semibold italic text-primary max-lg:my-6">
				{category?.title ?? t('notFound')}
			</div>
			<div className="grid grid-cols-3 justify-center gap-6 max-xl:grid-cols-2 max-lg:w-full max-lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
				{products.docs.map((p) => (
					<ProductCard
						product={p}
						key={p.slug}
						size="sm"
						className="justify-self-center"
					/>
				))}
			</div>
		</div>
	)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string; locale: string }>
}): Promise<Metadata> {
	const { slug = '', locale: _locale } = await params
	const locale = _locale as Lang
	return generateMeta({
		doc: await queryCategoryBySlug({ slug: slug ?? '', locale }),
	})
}

const queryCategoryBySlug = cache(
	async ({ slug: categorySlug, locale }: { slug: string; locale: Lang }) => {
		const payload = await getPayload({ config: configPromise })

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
	},
)
