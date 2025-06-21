import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { FooterSizeField } from '@/fields/footer'
import { slugField } from '@/fields/slug'
import { revalidateHeaderForCollection } from '@/globals/Header/hooks/revalidateHeader'
import { Lang } from '@/utilities/lang'

import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { ProductCategoriesSlug } from './slug'

export const ProductCategoriesCollection: CollectionConfig<typeof ProductCategoriesSlug> = {
	slug: ProductCategoriesSlug,
	labels: {
		singular: {
			[Lang.English]: 'Product Category',
			[Lang.Vietnamese]: 'Danh mục sản phẩm',
		},
		plural: {
			[Lang.English]: 'Product Categories',
			[Lang.Vietnamese]: 'Danh mục sản phẩm',
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
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: ProductSubCategoriesSlug,
			type: 'join',
			collection: ProductSubCategoriesSlug,
			on: ProductCategoriesSlug,
			label: {
				[Lang.English]: 'Sub Categories',
				[Lang.Vietnamese]: 'Danh mục phụ',
			},
		},
		{
			name: ProductsSlug,
			type: 'join',
			collection: ProductsSlug,
			on: ProductCategoriesSlug,
			label: {
				[Lang.English]: 'Products',
				[Lang.Vietnamese]: 'Sản phẩm',
			},
		},
		...slugField(),
		FooterSizeField,
	],
	admin: {
		useAsTitle: 'title',
	},
	hooks: {
		afterChange: [revalidateHeaderForCollection],
	},
}
