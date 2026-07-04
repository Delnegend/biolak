import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const MediaBlockConf: Block = {
	slug: 'media',
	interfaceName: 'MediaBlockProps',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.media.fieldMedia'),
			required: true,
		},
	],
}
