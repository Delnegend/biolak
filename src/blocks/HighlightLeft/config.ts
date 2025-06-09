import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const HighlightLeftBlockConf: Block = {
	slug: 'highlight-left',
	interfaceName: 'HighlightLeftBlockProps',
	imageURL: '/thumbs/highlight-left.avif',
	labels: {
		singular: {
			[Lang.English]: 'Highlight Left',
			[Lang.Vietnamese]: 'Nổi bật trái',
		},
		plural: {
			[Lang.English]: 'Highlight Left',
			[Lang.Vietnamese]: 'Nổi bật trái',
		},
	},
	fields: [
		{
			name: 'order',
			type: 'number',
			label: {
				[Lang.English]: 'Order',
				[Lang.Vietnamese]: 'Thứ tự',
			},
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: 'description',
			type: 'textarea',
			label: {
				[Lang.English]: 'Description',
				[Lang.Vietnamese]: 'Mô tả',
			},
			required: true,
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			label: {
				[Lang.English]: 'Image',
				[Lang.Vietnamese]: 'Hình ảnh',
			},
			relationTo: MediaSlug,
		},
	],
}
