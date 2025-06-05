import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { CallToActionLeftBlockDefaults as defaults } from './defaults'

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
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
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
