import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const ProductsCarouselBlockConf: Block = {
	slug: 'productsCarousel',
	interfaceName: 'ProductsCarouselBlockProps',
	imageURL: '/thumbs/products-carousel.avif',
	labels: {
		plural: adminLabel('admin.blocks.productsCarousel.labelPlural'),
		singular: adminLabel('admin.blocks.productsCarousel.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.productsCarousel.fieldTitle'),
			localized: true,
			admin: {
				placeholder: vi.admin.blocks.productsCarousel.placeholderTitle,
			},
		},
		{
			name: 'products',
			type: 'relationship',
			label: adminLabel('admin.blocks.productsCarousel.fieldProducts'),
			relationTo: ProductsSlug,
			hasMany: true,
		},
		{
			name: 'watchMoreBtnLabel',
			type: 'text',
			label: adminLabel('admin.blocks.productsCarousel.fieldWatchMoreBtnLabel'),
			localized: true,
			admin: {
				placeholder: vi.admin.blocks.productsCarousel.placeholderWatchMoreBtnLabel,
			},
		},
		link({
			overrides: {
				name: 'apb',
				label: adminLabel('admin.blocks.productsCarousel.fieldApb'),
				localized: true,
				required: true,
			},
			label: {
				placeholder: vi.admin.blocks.productsCarousel.placeholderApbLabel,
				required: false,
			},
		}),
	],
}
