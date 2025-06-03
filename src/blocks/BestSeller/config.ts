import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Best Seller',
				[Lang.Vietnamese]: 'Sản phẩm bán chạy',
			}),
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
