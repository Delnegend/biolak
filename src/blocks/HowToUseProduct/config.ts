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
			en: 'How to use product',
			vi: 'Huớng dẫn sử dụng sản phẩm',
		},
		plural: {
			en: 'How to use product',
			vi: 'Huớng dẫn sử dụng sản phẩm',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
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
				en: 'Subtitle',
				vi: 'Tiêu đề phụ',
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
				en: 'Content',
				vi: 'Nội dung',
			},
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Image',
				vi: 'Ảnh minh họa',
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
		},
	],
}
