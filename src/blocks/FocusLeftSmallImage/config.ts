import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const FocusLeftSmallImageBlockConf: Block = {
	slug: 'focus-left-small-image',
	interfaceName: 'FocusLeftSmallImageBlockProps',
	imageURL: '/thumbs/focus-left-small-image.avif',
	labels: {
		singular: {
			[Lang.English]: 'Focus Left Small Image',
			[Lang.Vietnamese]: 'Hình ảnh nhỏ bên trái',
		},
		plural: {
			[Lang.English]: 'Focuses Left Small Image',
			[Lang.Vietnamese]: 'Hình ảnh nhỏ bên trái',
		},
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			label: {
				[Lang.English]: 'Image',
				[Lang.Vietnamese]: 'Hình ảnh',
			},
			relationTo: MediaSlug,
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
	],
}
