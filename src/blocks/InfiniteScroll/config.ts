import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const InfiniteScrollBlockConf: Block = {
	slug: 'infiniteScroll',
	interfaceName: 'InfiniteScrollBlockProps',
	imageURL: '/thumbs/infinite-scroll.avif',
	labels: {
		singular: adminLabel('admin.blocks.infiniteScroll.label'),
		plural: adminLabel('admin.blocks.infiniteScroll.labelPlural'),
	},
	fields: [
		{
			name: 'graphic',
			type: 'upload',
			label: adminLabel('admin.blocks.infiniteScroll.fieldGraphic'),
			localized: true,
			relationTo: MediaSlug,
		},
		{
			name: 'animationDuration',
			type: 'number',
			label: adminLabel('admin.blocks.infiniteScroll.fieldAnimationDuration'),
			localized: true,
			defaultValue: 10,
		},
	],
}
