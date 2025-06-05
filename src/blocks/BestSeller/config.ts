import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'

import { BestSellerBlockDefaults as defaults } from './defaults'

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
			label: {
				vi: 'Tiêu đề',
				en: 'Title',
			},
			localized: true,
			defaultValue: defaults.title,
			admin: {
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'description',
			type: 'textarea',
			label: {
				vi: 'Mô tả',
				en: 'Description',
			},
			localized: true,
		},
		{
			name: 'products',
			label: {
				vi: 'Sản phẩm',
				en: 'Products',
			},
			type: 'relationship',
			relationTo: ProductsSlug,
			hasMany: true,
		},
	],
}
