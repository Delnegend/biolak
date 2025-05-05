import type { Block } from 'payload'

import { Media } from '@/collections/Media'
import { link } from '@/fields/link'

export const CallToActionCenterBlockConf: Block = {
	slug: 'cta-center',
	interfaceName: 'CallToActionCenterBlockProps',
	imageURL: '/thumbs/call-to-action-center.avif',
	labels: {
		plural: {
			en: 'Call to Action (Center)',
			vi: 'Kêu gọi hành động (Trung tâm)',
		},
		singular: {
			en: 'Call to Action (Center)',
			vi: 'Kêu gọi hành động (Trung tâm)',
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
