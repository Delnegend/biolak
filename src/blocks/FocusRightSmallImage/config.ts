import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const FocusRightSmallImageBlockConf: Block = {
	slug: 'focus-right-small-image',
	interfaceName: 'FocusRightSmallImageBlockProps',
	imageURL: '/thumbs/focus-right-small-image.avif',
	labels: {
		singular: adminLabel('admin.blocks.focus-right-small-image.label'),
		plural: adminLabel('admin.blocks.focus-right-small-image.labelPlural'),
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.focus-right-small-image.fieldImage'),
			relationTo: MediaSlug,
		},
		{
			name: 'content',
			type: 'richText',
			label: adminLabel('admin.blocks.focus-right-small-image.fieldContent'),
			required: true,
			localized: true,
		},
	],
}
