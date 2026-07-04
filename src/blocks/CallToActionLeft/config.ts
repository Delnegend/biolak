import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const CallToActionLeftBlockConf: Block = {
	slug: 'cta-left',
	interfaceName: 'CallToActionLeftBlockProps',
	imageURL: '/thumbs/call-to-action-left.avif',
	labels: {
		plural: adminLabel('admin.blocks.cta-left.labelPlural'),
		singular: adminLabel('admin.blocks.cta-left.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: adminLabel('admin.blocks.cta-left.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: adminLabel('admin.blocks.cta-left.fieldDescription'),
			localized: true,
		},
		{
			name: 'background',
			type: 'upload',
			label: adminLabel('admin.blocks.cta-left.fieldBackground'),
			relationTo: MediaSlug,
		},
		link({
			overrides: {
				required: true,
				localized: true,
			},
			label: {
				placeholder: vi.admin.blocks['cta-left'].placeholderLinkLabel,
				required: false,
			},
		}),
	],
}
