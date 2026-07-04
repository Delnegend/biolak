import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const HighlighRightBlockConf: Block = {
	slug: 'highlight-right',
	interfaceName: 'HighlightRightBlockProps',
	imageURL: '/thumbs/highlight-right.avif',
	labels: {
		singular: adminLabel('admin.blocks.highlight-right.label'),
		plural: adminLabel('admin.blocks.highlight-right.labelPlural'),
	},
	fields: [
		{
			name: 'order',
			type: 'number',
			label: adminLabel('admin.blocks.highlight-right.fieldOrder'),
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.highlight-right.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: adminLabel('admin.blocks.highlight-right.fieldDescription'),
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.highlight-right.fieldImage'),
			relationTo: MediaSlug,
		},
	],
}
