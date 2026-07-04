import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const BestSellerBlockConf: Block = {
	slug: 'bestSeller',
	interfaceName: 'BestSellerBlockProps',
	imageURL: '/thumbs/bestseller.avif',
	labels: {
		plural: adminLabel('admin.blocks.bestSeller.labelPlural'),
		singular: adminLabel('admin.blocks.bestSeller.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.bestSeller.fieldTitle'),
			localized: true,
			admin: {
				placeholder: vi.admin.blocks.bestSeller.placeholderTitle,
			},
		},
		{
			name: 'description',
			type: 'textarea',
			label: adminLabel('admin.blocks.bestSeller.fieldDescription'),
			localized: true,
		},
		{
			name: 'products',
			label: adminLabel('admin.blocks.bestSeller.fieldProducts'),
			type: 'relationship',
			relationTo: ProductsSlug,
			hasMany: true,
		},
		link({
			label: {
				placeholder: vi.admin.blocks.bestSeller.placeholderLinkLabel,
				required: false,
			},
		}),
	],
}
