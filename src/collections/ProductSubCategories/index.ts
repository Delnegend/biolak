import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { FooterSizeField } from '@/fields/footer'
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
		create: allow(Role.Admin, Role.ContentManager),
		delete: allow(Role.Admin, Role.ContentManager),
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
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
			localized: true,
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
		FooterSizeField,
	],
	admin: {
		useAsTitle: 'title',
	},
}
