import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const HighlightLeftBlockConf: Block = {
	slug: 'highlight-left',
	interfaceName: 'HighlightLeftBlockProps',
	imageURL: '/thumbs/highlight-left.avif',
	labels: {
		singular: {
			en: 'Highlight Left',
			vi: 'Nổi bật trái',
		},
		plural: {
			en: 'Highlight Left',
			vi: 'Nổi bật trái',
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
