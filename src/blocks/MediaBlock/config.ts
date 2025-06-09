import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const MediaBlockConf: Block = {
	slug: 'media',
	interfaceName: 'MediaBlockProps',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Media',
				[Lang.Vietnamese]: 'Phương tiện',
			},
			required: true,
		},
	],
}
