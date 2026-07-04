import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { Lang } from '@/i18n/routing'

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
			admin: {
				placeholder: 'Sản phẩm bán chạy',
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
		link({
			label: {
				placeholder: 'XEM TẤT CẢ SẢN PHẨM →',
				required: false,
			},
		}),
	],
}
