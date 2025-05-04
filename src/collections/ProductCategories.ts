import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
	slug: 'productCategories',
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
		...slugField(),
	],
	admin: {
		useAsTitle: 'title',
	},
}
