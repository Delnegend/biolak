import { CollectionConfig } from 'payload'

import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'

import { ProductCategoriesSlug } from '../ProductCategories/slug'
import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from './slug'

export const ProductSubCategoriesCollection: CollectionConfig<typeof ProductSubCategoriesSlug> = {
	slug: ProductSubCategoriesSlug,
	labels: {
		singular: {
			en: 'Product Sub Category',
			vi: 'Danh mục con sản phẩm',
		},
		plural: {
			en: 'Product Sub Categories',
			vi: 'Danh mục con sản phẩm',
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
			name: ProductCategoriesSlug,
			type: 'relationship',
			label: {
				en: 'Category',
				vi: 'Danh mục',
			},
			relationTo: ProductCategoriesSlug,
			required: true,
		},
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
			name: ProductsSlug,
			type: 'join',
			collection: ProductsSlug,
			on: ProductSubCategoriesSlug,
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
