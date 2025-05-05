import type { Block } from 'payload'

import { Media } from '@/collections/Media'

export const MediaBlockConf: Block = {
	slug: 'media',
	interfaceName: 'MediaBlockProps',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: Media.slug,
			required: true,
		},
	],
}
