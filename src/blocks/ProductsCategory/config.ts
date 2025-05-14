import { Block } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'

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
			required: true,
			defaultValue: 'XEM TẤT CẢ CÁC SẢN PHẨM',
		},
	],
}
