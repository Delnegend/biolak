import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const CallToActionCenterBlockConf: Block = {
	slug: 'cta-center',
	interfaceName: 'CallToActionCenterBlockProps',
	imageURL: '/thumbs/call-to-action-center.avif',
	labels: {
		plural: adminLabel('admin.blocks.cta-center.labelPlural'),
		singular: adminLabel('admin.blocks.cta-center.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: adminLabel('admin.blocks.cta-center.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: adminLabel('admin.blocks.cta-center.fieldSubTitle'),
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: adminLabel('admin.blocks.cta-center.fieldDescription'),
			localized: true,
		},
		{
			name: 'background',
			type: 'upload',
			label: adminLabel('admin.blocks.cta-center.fieldBackground'),
			relationTo: MediaSlug,
		},
		link({
			overrides: {
				required: true,
				localized: true,
			},
			label: {
				placeholder: vi.admin.blocks['cta-center'].placeholderLinkLabel,
				required: false,
			},
		}),
	],
}
