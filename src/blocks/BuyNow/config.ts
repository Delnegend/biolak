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
			localized: true,
			defaultValue: defaults.buttonLabel,
			admin: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				en: 'Product',
				vi: 'Sản phẩm',
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
