'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const getProductsBySubCategory = cache(
	async (
		subCategorySlug: unknown,
	): Promise<
		| {
				success: true
				data: Product[]
		  }
		| {
				success: false
				error: string
		  }
	> => {
		const locale = await getClientLang()

		if (typeof subCategorySlug !== 'string') {
			return {
				success: false,
				error: matchLang({
					[Lang.English]: 'Invalid input',
					[Lang.Vietnamese]: 'Định dạng đầu vào không hợp lệ',
				})({ locale }),
			}
		}

		const payload = await getPayload({ config: configPromise })
		const products = await payload.find({
			collection: ProductsSlug,
			overrideAccess: false,
			where: {
				[`${ProductSubCategoriesSlug}.slug`]: {
					equals: subCategorySlug,
				},
			},
			locale,
		})

		return {
			success: true,
			data: products.docs,
		}
	},
)
