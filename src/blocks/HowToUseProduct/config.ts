import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'How to use',
				[Lang.Vietnamese]: 'Huớng dẫn sử dụng',
			}),
		},
		{
			name: 'subtitle',
			type: 'text',
			label: {
				en: 'Subtitle',
				vi: 'Tiêu đề phụ',
			},
			localized: true,
		},
		{
			name: 'content',
			type: 'richText',
			label: {
				en: 'Content',
				vi: 'Nội dung',
			},
			required: true,
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
		},
	],
}
