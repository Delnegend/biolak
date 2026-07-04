import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const HighlightLeftBlockConf: Block = {
	slug: 'highlight-left',
	interfaceName: 'HighlightLeftBlockProps',
	imageURL: '/thumbs/highlight-left.avif',
	labels: {
		singular: adminLabel('admin.blocks.highlight-left.label'),
		plural: adminLabel('admin.blocks.highlight-left.labelPlural'),
	},
	fields: [
		{
			name: 'order',
			type: 'number',
			label: adminLabel('admin.blocks.highlight-left.fieldOrder'),
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.highlight-left.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: adminLabel('admin.blocks.highlight-left.fieldDescription'),
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: adminLabel('admin.blocks.highlight-left.fieldImage'),
			relationTo: MediaSlug,
		},
	],
}
