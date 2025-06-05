import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const FocusRightSmallImageBlockConf: Block = {
	slug: 'focus-right-small-image',
	interfaceName: 'FocusRightSmallImageBlockProps',
	imageURL: '/thumbs/focus-right-small-image.avif',
	labels: {
		singular: {
			en: 'Focus Right Small Image',
			vi: 'Hình ảnh nhỏ bên phải',
		},
		plural: {
			en: 'Focuses Right Small Image',
			vi: 'Hình ảnh nhỏ bên phải',
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
			localized: true,
		},
	],
}
