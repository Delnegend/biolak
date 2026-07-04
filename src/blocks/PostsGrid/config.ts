import { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { Lang } from '@/i18n/routing'
import { PostCategory } from '@/payload-types'

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
			name: 'showTitle',
			type: 'checkbox',
			label: {
				[Lang.English]: 'Show post category title',
				[Lang.Vietnamese]: 'Hiển thị tiêu đề danh mục bài viết',
			},
			defaultValue: false,
		},
		{
			name: PostCategoriesSlug,
			label: {
				[Lang.English]: 'Post Category',
				[Lang.Vietnamese]: 'Danh mục bài viết',
			},
			type: 'relationship',
			relationTo: PostCategoriesSlug,
			required: true,
			admin: {
				condition: (data: Partial<PostCategory>) => !data.postCategoryLayout,
			},
		},
	],
}
