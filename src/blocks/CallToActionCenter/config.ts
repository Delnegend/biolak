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
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: {
				en: 'Sub Title',
				vi: 'Tiêu đề phụ',
			},
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: {
				en: 'Description',
				vi: 'Mô tả',
			},
			localized: true,
		},
		{
			name: 'background',
			type: 'upload',
			label: {
				en: 'Background',
				vi: 'Ảnh nền',
			},
			relationTo: MediaSlug,
		},
		link({
			overrides: {
				label: {
					en: 'Button Label',
					vi: 'Nhãn nút',
				},
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
