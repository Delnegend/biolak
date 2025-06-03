import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const FocusRightLargeImageBlockConf: Block = {
	slug: 'focus-right-large-image',
	interfaceName: 'FocusRightLargeImageBlockProps',
	imageURL: '/thumbs/focus-right-large-image.avif',
	labels: {
		singular: {
			en: 'Focus Right Large Image',
			vi: 'Hình ảnh lớn bên phải',
		},
		plural: {
			en: 'Focuses Right Large Image',
			vi: 'Hình ảnh lớn bên phải',
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
