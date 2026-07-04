import { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostCategory } from '@/payload-types'
import { adminLabel } from '@/utilities/adminLabel'

export const PostsGridBlockConf: Block = {
	slug: 'posts-grid',
	interfaceName: 'PostsGridBlockProps',
	imageURL: '/thumbs/posts-grid.avif',
	labels: {
		singular: adminLabel('admin.blocks.posts-grid.label'),
		plural: adminLabel('admin.blocks.posts-grid.labelPlural'),
	},
	fields: [
		{
			name: 'showTitle',
			type: 'checkbox',
			label: adminLabel('admin.blocks.posts-grid.fieldShowTitle'),
			defaultValue: false,
		},
		{
			name: PostCategoriesSlug,
			label: adminLabel('admin.blocks.posts-grid.fieldPostCategories'),
			type: 'relationship',
			relationTo: PostCategoriesSlug,
			required: true,
			admin: {
				condition: (data: Partial<PostCategory>) => !data.postCategoryLayout,
			},
		},
	],
}
