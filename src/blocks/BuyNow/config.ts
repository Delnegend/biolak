import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'

export const BuyNowBlockConf: Block = {
	slug: 'buy-now',
	interfaceName: 'BuyNowBlockProps',
	imageURL: '/thumbs/buy-now.avif',
	labels: {
		singular: {
			en: 'Buy Now',
			vi: 'Mua ngay',
		},
		plural: {
			en: 'Buy Nows',
			vi: 'Mua ngay',
		},
	},
	fields: [
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			defaultValue: 'MUA NGAY',
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				en: 'Product',
				vi: 'Sản phẩm',
			},
		},
	],
}
