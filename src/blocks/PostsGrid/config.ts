import { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { Lang } from '@/utilities/lang'

export const PostsGridBlockConf: Block = {
	slug: 'posts-grid',
	interfaceName: 'PostsGridBlockProps',
	imageURL: '/thumbs/posts-grid.avif',
	labels: {
		singular: {
			[Lang.English]: 'Posts Grid',
			[Lang.Vietnamese]: 'Luới bài viết',
		},
		plural: {
			[Lang.English]: 'Posts Grids',
			[Lang.Vietnamese]: 'Luới bài viết',
		},
	},
	fields: [
		{
			name: PostCategoriesSlug,
			label: {
				[Lang.English]: 'Post Category',
				[Lang.Vietnamese]: 'Danh mục bài viết',
			},
			type: 'relationship',
			relationTo: PostCategoriesSlug,
		},
	],
}
