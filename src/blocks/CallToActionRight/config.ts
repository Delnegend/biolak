import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const CallToActionRightBlockConf: Block = {
	slug: 'cta-right',
	interfaceName: 'CallToActionRightBlockProps',
	imageURL: '/thumbs/call-to-action-right.avif',
	labels: {
		plural: adminLabel('admin.blocks.cta-right.labelPlural'),
		singular: adminLabel('admin.blocks.cta-right.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: adminLabel('admin.blocks.cta-right.fieldTitle'),
			required: true,
			localized: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: adminLabel('admin.blocks.cta-right.fieldSubTitle'),
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: adminLabel('admin.blocks.cta-right.fieldDescription'),
			localized: true,
		},
		{
			name: 'gallery',
			type: 'array',
			label: adminLabel('admin.blocks.cta-right.fieldGallery'),
			labels: {
				singular: adminLabel('admin.blocks.cta-right.arrayGallerySingular'),
				plural: adminLabel('admin.blocks.cta-right.arrayGalleryPlural'),
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: adminLabel('admin.blocks.cta-right.fieldGalleryTitle'),
					required: true,
					localized: true,
				},
				{
					name: 'image',
					type: 'upload',
					label: adminLabel('admin.blocks.cta-right.fieldGalleryImage'),
					relationTo: MediaSlug,
				},
			],
		},
		link({
			overrides: {
				required: true,
				localized: true,
			},
			label: {
				placeholder: vi.admin.blocks['cta-right'].placeholderLinkLabel,
				required: false,
			},
		}),
	],
}
