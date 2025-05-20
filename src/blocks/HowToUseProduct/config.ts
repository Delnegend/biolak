import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

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
			defaultValue: 'Hướng dẫn sử dụng',
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
	],
}
