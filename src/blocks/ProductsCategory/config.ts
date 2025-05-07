import { Block } from 'payload'

import { ProductCategories } from '@/collections/ProductCategories'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategories } from '@/collections/ProductSubCategories'

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
			relationTo: [ProductCategories.slug, ProductSubCategories.slug],
			label: {
				en: 'Products Category',
				vi: 'Danh mục sản phẩm',
			},
			required: true,
		},
		{
			name: 'products',
			type: 'array',
			required: true,
			label: {
				en: 'Products',
				vi: 'Sản phẩm',
			},
			labels: {
				singular: {
					en: 'Product',
					vi: 'Sản phẩm',
				},
				plural: {
					en: 'Products',
					vi: 'Sản phẩm',
				},
			},
			fields: [
				{
					name: 'product',
					type: 'relationship',
					relationTo: ProductsSlug,
					label: {
						en: 'Product',
						vi: 'Sản phẩm',
					},
				},
			],
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
