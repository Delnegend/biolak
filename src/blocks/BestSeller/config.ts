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
			[Lang.English]: 'Best Sellers',
			[Lang.Vietnamese]: 'Sản phẩm bán chạy',
		},
		singular: {
			[Lang.English]: 'Best Seller',
			[Lang.Vietnamese]: 'Sản phẩm bán chạy',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.Vietnamese]: 'Tiêu đề',
				[Lang.English]: 'Title',
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
				[Lang.Vietnamese]: 'Mô tả',
				[Lang.English]: 'Description',
			},
			localized: true,
		},
		{
			name: 'products',
			label: {
				[Lang.Vietnamese]: 'Sản phẩm',
				[Lang.English]: 'Products',
			},
			type: 'relationship',
			relationTo: ProductsSlug,
			hasMany: true,
		},
	],
}
