import { Block } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { Lang } from '@/utilities/lang'

import { ProductsCategoryBlockDefaults } from './defaults'

export const ProductsCategoryBlockConf: Block = {
	slug: 'productsCategory',
	interfaceName: 'ProductsCategoryBlockProps',
	imageURL: '/thumbs/products-category.avif',
	labels: {
		singular: {
			[Lang.English]: 'Products Category Preview',
			[Lang.Vietnamese]: 'Danh mục sản phẩm xem trước',
		},
		plural: {
			[Lang.English]: 'Products Categories Preview',
			[Lang.Vietnamese]: 'Danh mục sản phẩm xem trước',
		},
	},
	fields: [
		{
			name: 'category',
			type: 'relationship',
			relationTo: [ProductCategoriesSlug, ProductSubCategoriesSlug],
			label: {
				[Lang.English]: 'Products Category',
				[Lang.Vietnamese]: 'Danh mục sản phẩm',
			},
			required: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				[Lang.English]: 'Button Label',
				[Lang.Vietnamese]: 'Nhãn nút',
			},
			localized: true,
			defaultValue: ProductsCategoryBlockDefaults.buttonLabel,
			admin: {
				placeholder: ProductsCategoryBlockDefaults.buttonLabel(Lang.Vietnamese),
			},
		},
	],
}
