import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const CallToAddToCartBlockConf: Block = {
	slug: 'call-to-add-to-cart',
	interfaceName: 'CallToAddToCartBlockProps',
	imageURL: '/thumbs/cta-add-to-cart.avif',
	labels: {
		singular: adminLabel('admin.blocks.call-to-add-to-cart.label'),
		plural: adminLabel('admin.blocks.call-to-add-to-cart.labelPlural'),
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.call-to-add-to-cart.fieldImage'),
		},
		{
			name: 'content',
			type: 'richText',
			label: adminLabel('admin.blocks.call-to-add-to-cart.fieldContent'),
			localized: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: adminLabel('admin.blocks.call-to-add-to-cart.fieldButtonLabel'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.call-to-add-to-cart.placeholderButtonLabel'),
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: adminLabel('admin.blocks.call-to-add-to-cart.fieldProducts'),
			required: true,
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
		},
	],
}
