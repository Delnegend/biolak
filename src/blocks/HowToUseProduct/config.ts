import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const HowToUseProductBlockConf: Block = {
	slug: 'how-to-use-product',
	interfaceName: 'HowToUseProductBlockProps',
	imageURL: '/thumbs/how-to-use-product.avif',
	labels: {
		singular: adminLabel('admin.blocks.how-to-use-product.label'),
		plural: adminLabel('admin.blocks.how-to-use-product.labelPlural'),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.how-to-use-product.fieldTitle'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.how-to-use-product.placeholderTitle'),
			},
		},
		{
			name: 'subtitle',
			type: 'text',
			label: adminLabel('admin.blocks.how-to-use-product.fieldSubtitle'),
			localized: true,
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
		{
			name: 'content',
			type: 'richText',
			label: adminLabel('admin.blocks.how-to-use-product.fieldContent'),
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.how-to-use-product.fieldImage'),
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: adminLabel('admin.blocks.how-to-use-product.fieldProducts'),
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
