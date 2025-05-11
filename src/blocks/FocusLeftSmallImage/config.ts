import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const FocusLeftSmallImageBlockConf: Block = {
	slug: 'focus-left-small-image',
	interfaceName: 'FocusLeftSmallImageBlockProps',
	imageURL: '/thumbs/focus-left-small-image.avif',
	labels: {
		singular: {
			en: 'Focus Left Small Image',
			vi: 'Hình ảnh nhỏ bên trái',
		},
		plural: {
			en: 'Focuses Left Small Image',
			vi: 'Hình ảnh nhỏ bên trái',
		},
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			label: {
				en: 'Image',
				vi: 'Hình ảnh',
			},
			relationTo: MediaSlug,
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
	],
}
