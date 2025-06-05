import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
			defaultValue: matchLang({
				[Lang.English]: 'BUY NOW',
				[Lang.Vietnamese]: 'MUA NGAY',
			}),
			admin: {
				placeholder: 'Mua ngay',
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
