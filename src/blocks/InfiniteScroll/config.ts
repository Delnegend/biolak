import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const InfiniteScrollBlockConf: Block = {
	slug: 'infiniteScroll',
	interfaceName: 'InfiniteScrollBlockProps',
	imageURL: '/thumbs/infinite-scroll.avif',
	labels: {
		singular: {
			en: 'Infinite Scroll',
			vi: 'Cuộn vô tận',
		},
		plural: {
			en: 'Infinite Scroll',
			vi: 'Cuộn vô tận',
		},
	},
	fields: [
		{
			name: 'graphic',
			type: 'upload',
			label: {
				en: 'Graphic',
				vi: 'Ảnh đồ họa',
			},
			required: true,
			relationTo: MediaSlug,
		},
		{
			name: 'animationDuration',
			type: 'number',
			label: 'Animation Duration in seconds',
			defaultValue: 5,
		},
	],
}
