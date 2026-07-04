import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { Lang } from '@/i18n/routing'

export const CallToActionLeftBlockConf: Block = {
	slug: 'cta-left',
	interfaceName: 'CallToActionLeftBlockProps',
	imageURL: '/thumbs/call-to-action-left.avif',
	labels: {
		plural: {
			[Lang.English]: 'Call to Action (Left)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Trái)',
		},
		singular: {
			[Lang.English]: 'Call to Action (Left)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Trái)',
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
				required: true,
				localized: true,
			},
			label: {
				placeholder: 'Tìm hiểu thêm',
				required: false,
			},
		}),
	],
}
