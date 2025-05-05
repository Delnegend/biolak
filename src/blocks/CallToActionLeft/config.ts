import type { Block } from 'payload'

import { Media } from '@/collections/Media'
import { link } from '@/fields/link'

export const CallToActionLeftBlockConf: Block = {
	slug: 'cta-left',
	interfaceName: 'CallToActionLeftBlockProps',
	imageURL: '/thumbs/call-to-action-left.avif',
	labels: {
		plural: {
			en: 'Call to Action (Left)',
			vi: 'Kêu gọi hành động (Trái)',
		},
		singular: {
			en: 'Call to Action (Left)',
			vi: 'Kêu gọi hành động (Trái)',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			required: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
		},
		{
			name: 'description',
			type: 'richText',
		},
		{
			name: 'background',
			type: 'upload',
			relationTo: Media.slug,
		},
		{
			name: 'button',
			type: 'group',
			fields: [
				{
					name: 'text',
					type: 'text',
					required: true,
				},
				link({ appearances: false, disableLabel: true }),
			],
		},
	],
}
