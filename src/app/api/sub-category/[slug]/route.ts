import config from '@payload-config'
import { getPayload } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export type GetProductsBySubCategorySlug = {
	Path: `/api/sub-category/${string}`
	Response:
		| {
				success: true
				data: {
					id: Product['id']
					slug?: Product['slug']
					title: Product['title']
					shortDescription: Product['shortDescription']
					variants: Product['variants']
					icon?: Product['icon']
				}[]
		  }
		| {
				success: false
				error: string
		  }
}

/** Get products by sub category slug */
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
	try {
		const [payload, slug, locale] = await Promise.all([
			getPayload({ config }),
			params.then(({ slug }) => slug),
			getClientLang(),
		])

		const products = (
			await payload.find({
				collection: ProductsSlug,
				overrideAccess: false,
				where: {
					[`${ProductSubCategoriesSlug}.slug`]: {
						equals: slug,
					},
				},
				limit: 1000,
				select: {
					id: true,
					slug: true,
					title: true,
					shortDescription: true,
					price: true,
					icon: true,
				},
				locale,
			})
		).docs

		if (products.length === 0) {
			return new Response(
				JSON.stringify({
					success: true,
					data: [],
				} satisfies GetProductsBySubCategorySlug['Response']),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
		}

		return new Response(
			JSON.stringify(
				(products.length > 0
					? {
							success: true,
							data: products,
						}
					: {
							success: false,
							error: matchLang({
								[Lang.English]: 'Product not found',
								[Lang.Vietnamese]: 'Không tìm thấy sản phẩm',
							})(locale),
						}) satisfies GetProductsBySubCategorySlug['Response'],
			),
			{
				status: products.length > 0 ? 200 : 404,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	} catch (e) {
		return new Response(
			JSON.stringify({
				success: false,
				error: typeof e === 'object' && e && 'message' in e ? e.message : e,
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}
}
