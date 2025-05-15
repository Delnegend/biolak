import { CollectionConfig } from 'payload'

import { CallToActionPostBlockConf } from '@/blocks/CallToActionPost/config'
import { PostsGridBlockConf } from '@/blocks/PostsGrid/config'
import { FooterSizeField } from '@/fields/footer'
import { slugField } from '@/fields/slug'

import { admin } from '../../access/admin'
import { anyone } from '../../access/anyone'
import { PostsSlug } from '../Posts/slug'
import { PostCategoriesSlug } from './slug'

export const PostCategoriesCollection: CollectionConfig<typeof PostCategoriesSlug> = {
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
				en: 'Category name',
				vi: 'Tên danh mục',
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
		{
			name: 'layout',
			label: {
				en: 'Layout',
				vi: 'Bố cục',
			},
			type: 'blocks',
			blocks: [CallToActionPostBlockConf, PostsGridBlockConf],
		},
		...slugField(),
		FooterSizeField,
	],
}
