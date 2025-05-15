import { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'

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
			name: PostCategoriesSlug,
			label: {
				en: 'Post Category',
				vi: 'Danh mục bài viết',
			},
			type: 'relationship',
			relationTo: PostCategoriesSlug,
		},
	],
}
