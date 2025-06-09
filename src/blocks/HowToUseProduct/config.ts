import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'

import { HowToUseProductBlockDefaults as defaults } from './defaults'

export const HowToUseProductBlockConf: Block = {
	slug: 'how-to-use-product',
	interfaceName: 'HowToUseProductBlockProps',
	imageURL: '/thumbs/how-to-use-product.avif',
	labels: {
		singular: {
			[Lang.English]: 'How to use product',
			[Lang.Vietnamese]: 'Huớng dẫn sử dụng sản phẩm',
		},
		plural: {
			[Lang.English]: 'How to use product',
			[Lang.Vietnamese]: 'Huớng dẫn sử dụng sản phẩm',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			localized: true,
			defaultValue: defaults.title,
			admin: {
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'subtitle',
			type: 'text',
			label: {
				[Lang.English]: 'Subtitle',
				[Lang.Vietnamese]: 'Tiêu đề phụ',
			},
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
			label: {
				[Lang.English]: 'Content',
				[Lang.Vietnamese]: 'Nội dung',
			},
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Image',
				[Lang.Vietnamese]: 'Ảnh minh họa',
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
		},
	],
}
