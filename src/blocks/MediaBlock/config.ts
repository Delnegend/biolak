import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const MediaBlockConf: Block = {
	slug: 'media',
	interfaceName: 'MediaBlockProps',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Media',
				vi: 'Phương tiện',
			},
			required: true,
		},
	],
}
