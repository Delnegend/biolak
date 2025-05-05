import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { CollectionConf } from '@/utilities/types'

import { ProductCategories } from './ProductCategories'

export const ProductSubCategories: CollectionConfig = {
	slug: 'productSubCategories',
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
			name: ProductCategories.slug,
			type: 'relationship',
			relationTo: ProductCategories.slug as CollectionSlug,
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
