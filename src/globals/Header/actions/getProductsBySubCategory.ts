'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { Product } from '@/payload-types'

export const getProductsBySubCategory = cache(
	async (subCategorySlug: unknown): Promise<Product[]> => {
		if (typeof subCategorySlug !== 'string') throw new Error('subCategorySlug must be a string')

		const payload = await getPayload({ config: configPromise })
		const products = await payload.find({
			collection: ProductsSlug,
			where: {
				[`${ProductSubCategoriesSlug}.slug`]: {
					equals: subCategorySlug,
				},
			},
		})

		return products.docs
	},
)
