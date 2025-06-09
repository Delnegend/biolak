import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const FocusRightSmallImageBlockConf: Block = {
	slug: 'focus-right-small-image',
	interfaceName: 'FocusRightSmallImageBlockProps',
	imageURL: '/thumbs/focus-right-small-image.avif',
	labels: {
		singular: {
			[Lang.English]: 'Focus Right Small Image',
			[Lang.Vietnamese]: 'Hình ảnh nhỏ bên phải',
		},
		plural: {
			[Lang.English]: 'Focuses Right Small Image',
			[Lang.Vietnamese]: 'Hình ảnh nhỏ bên phải',
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
