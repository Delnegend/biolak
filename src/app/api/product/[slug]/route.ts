import config from '@payload-config'
import { getPayload } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export type GetProductBySlug = {
	Path: `/api/product/${string}`
	Response:
		| {
				success: true
				data: {
					title: Product['title']
					shortDescription: Product['shortDescription']
					variants: Product['variants']
					icon: Product['icon']
				}
		  }
		| {
				success: false
				error: string
		  }
}

/** Get product by slug */
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

		const product = (
			await payload.find({
				collection: ProductsSlug,
				where: {
					slug: {
						equals: slug,
					},
				},
				limit: 1,
				select: {
					title: true,
					shortDescription: true,
					variants: true,
					icon: true,
				},
				locale,
			})
		).docs?.[0]

		return new Response(
			JSON.stringify(
				(product
					? {
							success: true,
							data: {
								title: product.title,
								shortDescription: product.shortDescription,
								variants: product.variants,
								icon: product.icon,
							},
						}
					: {
							success: false,
							error: matchLang({
								[Lang.English]: 'Product not found',
								[Lang.Vietnamese]: 'Không tìm thấy sản phẩm',
							})({ locale }),
						}) satisfies GetProductBySlug['Response'],
			),
			{
				status: product ? 200 : 404,
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
