import { Block } from 'payload'

import { Products } from '@/collections/Products'

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
		},
		{
			name: 'products',
			type: 'array',
			fields: [
				{
					name: 'product',
					type: 'relationship',
					relationTo: Products.slug as CollectionSlug,
				},
			],
		},
	],
}
