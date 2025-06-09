import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { CallToActionCenterBlockDefaults as defaults } from './defaults'

export const CallToActionCenterBlockConf: Block = {
	slug: 'cta-center',
	interfaceName: 'CallToActionCenterBlockProps',
	imageURL: '/thumbs/call-to-action-center.avif',
	labels: {
		plural: {
			[Lang.English]: 'Call to Action (Center)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Trung tâm)',
		},
		singular: {
			[Lang.English]: 'Call to Action (Center)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Trung tâm)',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: {
				[Lang.English]: 'Sub Title',
				[Lang.Vietnamese]: 'Tiêu đề phụ',
			},
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: {
				[Lang.English]: 'Description',
				[Lang.Vietnamese]: 'Mô tả',
			},
			localized: true,
		},
		{
			name: 'background',
			type: 'upload',
			label: {
				[Lang.English]: 'Background',
				[Lang.Vietnamese]: 'Ảnh nền',
			},
			relationTo: MediaSlug,
		},
		link({
			overrides: {
				defaultValue: defaults.buttonLabel,
				required: true,
				localized: true,
			},
			label: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
				required: false,
			},
		}),
	],
}
