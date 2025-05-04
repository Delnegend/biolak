import { Media } from '@/collections/Media'
import { link } from '@/fields/link'
import type { Block, CollectionSlug } from 'payload'

export const CallToActionRightBlockConf: Block = {
	slug: 'cta-right',
	interfaceName: 'CallToActionRightBlockProps',
	imageURL: '/thumbs/call-to-action-right.avif',
	labels: {
		plural: {
			en: 'Call to Action (Right)',
			vi: 'Kêu gọi hành động (Phải)',
		},
		singular: {
			en: 'Call to Action (Right)',
			vi: 'Kêu gọi hành động (Phải)',
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
			name: 'gallery',
			type: 'array',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: Media.slug as CollectionSlug,
				},
			],
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
