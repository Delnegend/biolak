import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const HighlightCenterBlockConf: Block = {
	slug: 'highlight-center',
	interfaceName: 'HighlightCenterBlockProps',
	imageURL: '/thumbs/highlight-center.avif',
	labels: {
		singular: {
			[Lang.English]: 'Highlight Center',
			[Lang.Vietnamese]: 'Nổi bật giữa',
		},
		plural: {
			[Lang.English]: 'Highlight Centers',
			[Lang.Vietnamese]: 'Nổi bật giữa',
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
