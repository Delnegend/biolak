import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const HighlightCenterBlockConf: Block = {
	slug: 'highlight-center',
	interfaceName: 'HighlightCenterBlockProps',
	imageURL: '/thumbs/highlight-center.avif',
	labels: {
		singular: {
			en: 'Highlight Center',
			vi: 'Nổi bật giữa',
		},
		plural: {
			en: 'Highlight Centers',
			vi: 'Nổi bật giữa',
		},
	},
	fields: [
		{
			name: 'order',
			type: 'number',
			label: {
				en: 'Order',
				vi: 'Thứ tự',
			},
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: {
				en: 'Description',
				vi: 'Mô tả',
			},
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: {
				en: 'Image',
				vi: 'Hình ảnh',
			},
			relationTo: MediaSlug,
		},
	],
}
