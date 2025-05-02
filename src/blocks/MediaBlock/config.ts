import { Media } from '@/collections/Media'
import type { Block, CollectionSlug } from 'payload'

export const MediaBlockConf: Block = {
	slug: 'media',
	interfaceName: 'MediaBlockProps',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: Media.slug as CollectionSlug,
			required: true,
		},
	],
}
