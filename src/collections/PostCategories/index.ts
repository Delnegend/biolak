import { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

import { admin } from '../../access/admin'
import { anyone } from '../../access/anyone'
import { PostsSlug } from '../Posts/slug'
import { PostCategoriesSlug } from './slug'

export const PostCategories: CollectionConfig<typeof PostCategoriesSlug> = {
	slug: PostCategoriesSlug,
	labels: {
		singular: {
			en: 'Post Category',
			vi: 'Danh mục bài viết',
		},
		plural: {
			en: 'Post Categories',
			vi: 'Danh mục bài viết',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: anyone,
		update: admin,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
		},
		{
			name: PostsSlug,
			type: 'join',
			collection: PostsSlug,
			on: PostCategoriesSlug,
			label: {
				en: 'Posts',
				vi: 'Bài viết',
			},
		},
		...slugField(),
	],
}
