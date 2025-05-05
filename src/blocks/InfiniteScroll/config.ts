import { Block } from 'payload'

import { Media } from '@/collections/Media'

export const InfiniteScrollBlockConf: Block = {
	slug: 'infiniteScroll',
	interfaceName: 'InfiniteScrollBlockProps',
	imageURL: '/thumbs/infinite-scroll.avif',
	labels: {
		singular: 'Infinite Scroll',
		plural: 'Infinite Scroll',
	},
	fields: [
		{
			name: 'graphic',
			type: 'upload',
			required: true,
			relationTo: Media.slug,
		},
		{
			name: 'animationDuration',
			type: 'number',
			label: 'Animation Duration in seconds',
			defaultValue: 5,
		},
	],
}
