import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const HighlighRightBlockConf: Block = {
	slug: 'highlight-right',
	interfaceName: 'HighlightRightBlockProps',
	imageURL: '/thumbs/highlight-right.avif',
	labels: {
		singular: {
			[Lang.English]: 'Highlight Right',
			[Lang.Vietnamese]: 'Nổi bật phải',
		},
		plural: {
			[Lang.English]: 'Highlight Right',
			[Lang.Vietnamese]: 'Nổi bật phải',
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
