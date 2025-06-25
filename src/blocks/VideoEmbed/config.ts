import { Block } from 'payload'

import { validateVideoLink } from './hooks/validateVideoLink'

export const VideoEmbedBlockConf: Block = {
	slug: 'videoEmbed',
	interfaceName: 'VideoEmbedBlockProps',
	imageURL: '/thumbs/video-embed.avif',
	labels: {
		singular: {
			en: 'Video Embed',
			vi: 'Nhúng Video',
		},
		plural: {
			en: 'Video Embeds',
			vi: 'Nhúng Video',
		},
	},
	fields: [
		{
			name: 'videoUrl',
			type: 'text',
			label: false,
			required: true,
			admin: {
				placeholder: 'https://www.youtube.com/watch?v=example',
			},
			validate: validateVideoLink,
		},
	],
}
