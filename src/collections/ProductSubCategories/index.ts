import { CollectionConfig } from 'payload'

import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'

import { ProductSubCategoriesSlug } from './slug'

export const ProductSubCategories: CollectionConfig<typeof ProductSubCategoriesSlug> = {
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
			name: 'category',
			type: 'relationship',
			relationTo: 'productCategories',
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
		...slugField(),
	],
	admin: {
		useAsTitle: 'title',
	},
}
