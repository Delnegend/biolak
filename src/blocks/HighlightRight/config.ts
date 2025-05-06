import { Block } from 'payload'

import { Media } from '@/collections/Media'

export const HighlighRightBlockConf: Block = {
	slug: 'highlight-right',
	interfaceName: 'HighlightRightBlockProps',
	imageURL: '/thumbs/highlight-right.avif',
	labels: {
		singular: {
			en: 'Highlight Right',
			vi: 'Nổi bật phải',
		},
		plural: {
			en: 'Highlight Right',
			vi: 'Nổi bật phải',
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
		},
		{
			name: 'description',
			type: 'textarea',
			label: {
				en: 'Description',
				vi: 'Mô tả',
			},
			required: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: {
				en: 'Image',
				vi: 'Hình ảnh',
			},
			relationTo: Media.slug,
		},
	],
}
