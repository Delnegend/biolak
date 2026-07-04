import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const LatestPostsBlockConf: Block = {
	slug: 'latestPosts',
	interfaceName: 'LatestPostsBlockProps',
	imageURL: '/thumbs/latest-posts.avif',
	labels: {
		singular: adminLabel('admin.blocks.latestPosts.label'),
		plural: adminLabel('admin.blocks.latestPosts.labelPlural'),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.latestPosts.fieldTitle'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.latestPosts.placeholderTitle'),
			},
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: adminLabel('admin.blocks.latestPosts.fieldButtonLabel'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.latestPosts.placeholderButtonLabel'),
			},
		},
		{
			name: 'posts',
			label: adminLabel('admin.blocks.latestPosts.fieldPosts'),
			type: 'relationship',
			relationTo: PostsSlug,
			required: true,
			hasMany: true,
		},
	],
}
