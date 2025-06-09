import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const FocusRightLargeImageBlockConf: Block = {
	slug: 'focus-right-large-image',
	interfaceName: 'FocusRightLargeImageBlockProps',
	imageURL: '/thumbs/focus-right-large-image.avif',
	labels: {
		singular: {
			[Lang.English]: 'Focus Right Large Image',
			[Lang.Vietnamese]: 'Hình ảnh lớn bên phải',
		},
		plural: {
			[Lang.English]: 'Focuses Right Large Image',
			[Lang.Vietnamese]: 'Hình ảnh lớn bên phải',
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
