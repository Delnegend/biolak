import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const InfiniteScrollBlockConf: Block = {
	slug: 'infiniteScroll',
	interfaceName: 'InfiniteScrollBlockProps',
	imageURL: '/thumbs/infinite-scroll.avif',
	labels: {
		singular: {
			[Lang.English]: 'Infinite Scroll',
			[Lang.Vietnamese]: 'Cuộn vô tận',
		},
		plural: {
			[Lang.English]: 'Infinite Scroll',
			[Lang.Vietnamese]: 'Cuộn vô tận',
		},
	},
	fields: [
		{
			name: 'graphic',
			type: 'upload',
			label: {
				[Lang.English]: 'Graphic',
				[Lang.Vietnamese]: 'Ảnh đồ họa',
			},
			required: true,
			localized: true,
			relationTo: MediaSlug,
		},
		{
			name: 'animationDuration',
			type: 'number',
			label: {
				[Lang.English]: 'Animation Duration in seconds',
				[Lang.Vietnamese]: 'Thời gian hoạt ảnh (giây)',
			},
			localized: true,
			defaultValue: 10,
		},
	],
}
