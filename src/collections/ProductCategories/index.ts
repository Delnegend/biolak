import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { FooterSizeField } from '@/fields/footer'
import { slugField } from '@/fields/slug'

import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { ProductCategoriesSlug } from './slug'

export const ProductCategoriesCollection: CollectionConfig<typeof ProductCategoriesSlug> = {
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
		create: allow(Role.Admin, Role.ContentManager),
		delete: allow(Role.Admin, Role.ContentManager),
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
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
		FooterSizeField,
	],
	admin: {
		useAsTitle: 'title',
	},
}
