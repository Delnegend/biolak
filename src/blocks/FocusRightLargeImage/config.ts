import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const FocusRightLargeImageBlockConf: Block = {
	slug: 'focus-right-large-image',
	interfaceName: 'FocusRightLargeImageBlockProps',
	imageURL: '/thumbs/focus-right-large-image.avif',
	labels: {
		singular: adminLabel('admin.blocks.focus-right-large-image.label'),
		plural: adminLabel('admin.blocks.focus-right-large-image.labelPlural'),
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.focus-right-large-image.fieldImage'),
			relationTo: MediaSlug,
		},
		{
			name: 'content',
			type: 'richText',
			label: adminLabel('admin.blocks.focus-right-large-image.fieldContent'),
			required: true,
			localized: true,
		},
	],
}
