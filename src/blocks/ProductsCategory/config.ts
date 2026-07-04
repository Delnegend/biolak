import { Block } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const ProductsCategoryBlockConf: Block = {
	slug: 'productsCategory',
	interfaceName: 'ProductsCategoryBlockProps',
	imageURL: '/thumbs/products-category.avif',
	labels: {
		singular: adminLabel('admin.blocks.productsCategory.label'),
		plural: adminLabel('admin.blocks.productsCategory.labelPlural'),
	},
	fields: [
		{
			name: 'category',
			type: 'relationship',
			relationTo: [ProductCategoriesSlug, ProductSubCategoriesSlug],
			label: adminLabel('admin.blocks.productsCategory.fieldCategory'),
			required: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: adminLabel('admin.blocks.productsCategory.fieldButtonLabel'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.productsCategory.placeholderButtonLabel'),
			},
		},
	],
}
