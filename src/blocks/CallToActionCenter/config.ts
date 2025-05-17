import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
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
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: {
				en: 'Sub Title',
				vi: 'Tiêu đề phụ',
			},
		},
		{
			name: 'description',
			type: 'richText',
			label: {
				en: 'Description',
				vi: 'Mô tả',
			},
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
		{
			name: 'button',
			type: 'group',
			label: {
				en: 'Button',
				vi: 'Nút',
			},
			fields: [
				{
					name: 'text',
					type: 'text',
					label: {
						en: 'Button Label',
						vi: 'Nhãn nút',
					},
					required: true,
				},
				link({ disableLabel: true }),
			],
		},
	],
}
