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
			en: 'Products Category Preview',
			vi: 'Danh mục sản phẩm xem trước',
		},
		plural: {
			en: 'Products Categories Preview',
			vi: 'Danh mục sản phẩm xem trước',
		},
	},
	fields: [
		{
			name: 'category',
			type: 'relationship',
			relationTo: [ProductCategoriesSlug, ProductSubCategoriesSlug],
			label: {
				en: 'Products Category',
				vi: 'Danh mục sản phẩm',
			},
			required: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			localized: true,
			defaultValue: ProductsCategoryBlockDefaults.buttonLabel,
			admin: {
				placeholder: ProductsCategoryBlockDefaults.buttonLabel(Lang.Vietnamese),
			},
		},
	],
}
