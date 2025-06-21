import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { FooterSizeField } from '@/fields/footer'
import { slugField } from '@/fields/slug'
import { revalidateHeaderForCollection } from '@/globals/Header/hooks/revalidateHeader'
import { Lang } from '@/utilities/lang'

import { ProductCategoriesSlug } from '../ProductCategories/slug'
import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from './slug'

export const ProductSubCategoriesCollection: CollectionConfig<typeof ProductSubCategoriesSlug> = {
	slug: ProductSubCategoriesSlug,
	labels: {
		singular: {
			[Lang.English]: 'Product Sub Category',
			[Lang.Vietnamese]: 'Danh mục con sản phẩm',
		},
		plural: {
			[Lang.English]: 'Product Sub Categories',
			[Lang.Vietnamese]: 'Danh mục con sản phẩm',
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
				[Lang.English]: 'Category',
				[Lang.Vietnamese]: 'Danh mục',
			},
			relationTo: ProductCategoriesSlug,
			required: true,
		},
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
			name: ProductsSlug,
			type: 'join',
			collection: ProductsSlug,
			on: ProductSubCategoriesSlug,
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
