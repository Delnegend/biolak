import { CollectionConfig } from 'payload'

import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'

import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { ProductCategoriesSlug } from './slug'

export const ProductCategories: CollectionConfig<typeof ProductCategoriesSlug> = {
	slug: ProductCategoriesSlug,
	labels: {
		singular: {
			en: 'Product Category',
			vi: 'Danh mục sản phẩm',
		},
		plural: {
			en: 'Product Categories',
			vi: 'Danh mục sản phẩm',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: anyone,
		update: admin,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
		},
		{
			name: ProductSubCategoriesSlug,
			type: 'join',
			collection: ProductSubCategoriesSlug,
			on: ProductCategoriesSlug,
			label: {
				en: 'Sub Categories',
				vi: 'Danh mục phụ',
			},
		},
		{
			name: ProductsSlug,
			type: 'join',
			collection: ProductsSlug,
			on: ProductCategoriesSlug,
			label: {
				en: 'Products',
				vi: 'Sản phẩm',
			},
		},
		...slugField(),
	],
	admin: {
		useAsTitle: 'title',
	},
}
