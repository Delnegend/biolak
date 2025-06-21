import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'

import { BuyNowBlockDefaults as defaults } from './defaults'

export const BuyNowBlockConf: Block = {
	slug: 'buy-now',
	interfaceName: 'BuyNowBlockProps',
	imageURL: '/thumbs/buy-now.avif',
	labels: {
		singular: {
			[Lang.English]: 'Buy Now',
			[Lang.Vietnamese]: 'Mua ngay',
		},
		plural: {
			[Lang.English]: 'Buy Nows',
			[Lang.Vietnamese]: 'Mua ngay',
		},
	},
	fields: [
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				[Lang.English]: 'Button Label',
				[Lang.Vietnamese]: 'Nhãn nút',
			},
			localized: true,
			admin: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				[Lang.English]: 'Product',
				[Lang.Vietnamese]: 'Sản phẩm',
			},
			admin: {
				condition: (data) => {
					const isProductDocument =
						!!data.reviewsVisible &&
						!!data.variants &&
						!!data.productCategories &&
						data.productSubCategories
					return !isProductDocument
				},
			},
			required: true,
		},
	],
}
