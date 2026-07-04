import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const HighlightCenterBlockConf: Block = {
	slug: 'highlight-center',
	interfaceName: 'HighlightCenterBlockProps',
	imageURL: '/thumbs/highlight-center.avif',
	labels: {
		singular: adminLabel('admin.blocks.highlight-center.label'),
		plural: adminLabel('admin.blocks.highlight-center.labelPlural'),
	},
	fields: [
		{
			name: 'order',
			type: 'number',
			label: adminLabel('admin.blocks.highlight-center.fieldOrder'),
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.highlight-center.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: adminLabel('admin.blocks.highlight-center.fieldDescription'),
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.highlight-center.fieldImage'),
			relationTo: MediaSlug,
		},
	],
}
