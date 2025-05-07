import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'

export const PostsGridBlockConf: Block = {
	slug: 'posts-grid',
	interfaceName: 'PostsGridBlockProps',
	imageURL: '/thumbs/posts-grid.avif',
	labels: {
		singular: {
			en: 'Posts Grid',
			vi: 'Luới bài viết',
		},
		plural: {
			en: 'Posts Grids',
			vi: 'Luới bài viết',
		},
	},
	fields: [
		{
			name: 'posts',
			label: {
				en: 'Posts',
				vi: 'Bài viết',
			},
			type: 'relationship',
			relationTo: PostsSlug,
			hasMany: true,
		},
	],
}
