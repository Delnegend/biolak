import { Block } from 'payload'

import { adminLabel } from '@/utilities/adminLabel'

import { validateVideoLink } from './hooks/validateVideoLink'

export const VideoEmbedBlockConf: Block = {
	slug: 'videoEmbed',
	interfaceName: 'VideoEmbedBlockProps',
	imageURL: '/thumbs/video-embed.avif',
	labels: {
		singular: adminLabel('admin.blocks.videoEmbed.label'),
		plural: adminLabel('admin.blocks.videoEmbed.labelPlural'),
	},
	fields: [
		{
			name: 'videoUrl',
			type: 'text',
			label: false,
			required: true,
			admin: {
				placeholder: adminLabel('admin.blocks.videoEmbed.placeholderVideoUrl'),
			},
			validate: validateVideoLink,
		},
	],
}
