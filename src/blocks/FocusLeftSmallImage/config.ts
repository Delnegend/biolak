import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const FocusLeftSmallImageBlockConf: Block = {
	slug: 'focus-left-small-image',
	interfaceName: 'FocusLeftSmallImageBlockProps',
	imageURL: '/thumbs/focus-left-small-image.avif',
	labels: {
		singular: adminLabel('admin.blocks.focus-left-small-image.label'),
		plural: adminLabel('admin.blocks.focus-left-small-image.labelPlural'),
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.focus-left-small-image.fieldImage'),
			relationTo: MediaSlug,
		},

		{
			name: 'content',
			type: 'richText',
			label: adminLabel('admin.blocks.focus-left-small-image.fieldContent'),
			required: true,
			localized: true,
		},
	],
}
