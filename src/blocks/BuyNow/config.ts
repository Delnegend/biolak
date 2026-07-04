import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const BuyNowBlockConf: Block = {
	slug: 'buy-now',
	interfaceName: 'BuyNowBlockProps',
	imageURL: '/thumbs/buy-now.avif',
	labels: {
		singular: adminLabel('admin.blocks.buy-now.label'),
		plural: adminLabel('admin.blocks.buy-now.labelPlural'),
	},
	fields: [
		{
			name: 'buttonLabel',
			type: 'text',
			label: adminLabel('admin.blocks.buy-now.fieldButtonLabel'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.buy-now.placeholderButtonLabel'),
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: adminLabel('admin.blocks.buy-now.fieldProducts'),
			admin: {
				condition: (data) => !data.productLayout,
			},
			required: true,
		},
	],
}
