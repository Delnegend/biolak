import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'

export const BestSellerBlockConf: Block = {
	slug: 'bestSeller',
	interfaceName: 'BestSellerBlockProps',
	imageURL: '/thumbs/bestseller.avif',
	labels: {
		plural: {
			en: 'Best Sellers',
			vi: 'Sản phẩm bán chạy',
		},
		singular: {
			en: 'Best Seller',
			vi: 'Sản phẩm bán chạy',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Sản phẩm bán chạy',
			label: {
				vi: 'Tiêu đề',
				en: 'Title',
			},
		},
		{
			name: 'description',
			type: 'textarea',
			label: {
				vi: 'Mô tả',
				en: 'Description',
			},
		},
		{
			name: 'products',
			type: 'array',
			label: {
				vi: 'Sản phẩm',
				en: 'Products',
			},
			labels: {
				singular: {
					vi: 'Sản phẩm',
					en: 'Product',
				},
				plural: {
					vi: 'Sản phẩm',
					en: 'Products',
				},
			},
			fields: [
				{
					name: 'product',
					type: 'relationship',
				},
			],
			relationTo: ProductsSlug,
		},
	],
}
