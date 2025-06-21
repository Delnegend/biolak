import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { CallToActionPostBlockConf } from '@/blocks/CallToActionPost/config'
import { PostsGridBlockConf } from '@/blocks/PostsGrid/config'
import { FooterSizeField } from '@/fields/footer'
import { slugField } from '@/fields/slug'
import { revalidateHeaderForCollection } from '@/globals/Header/hooks/revalidateHeader'
import { Lang } from '@/utilities/lang'

import { PostsSlug } from '../Posts/slug'
import { PostCategoriesSlug } from './slug'

export const PostCategoriesCollection: CollectionConfig<typeof PostCategoriesSlug> = {
	slug: PostCategoriesSlug,
	labels: {
		singular: {
			[Lang.English]: 'Post Category',
			[Lang.Vietnamese]: 'Danh mục bài viết',
		},
		plural: {
			[Lang.English]: 'Post Categories',
			[Lang.Vietnamese]: 'Danh mục bài viết',
		},
	},
	access: {
		create: allow(Role.Admin),
		delete: allow(Role.Admin),
		read: allow(Role.Public),
		update: allow(Role.Admin),
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Category name',
				[Lang.Vietnamese]: 'Tên danh mục',
			},
			required: true,
			localized: true,
		},
		{
			name: PostsSlug,
			type: 'join',
			collection: PostsSlug,
			on: PostCategoriesSlug,
			label: {
				[Lang.English]: 'Posts',
				[Lang.Vietnamese]: 'Bài viết',
			},
		},
		{
			name: 'layout',
			label: {
				[Lang.English]: 'Content',
				[Lang.Vietnamese]: 'Nội dung',
			},
			labels: {
				singular: {
					[Lang.English]: 'Block',
					[Lang.Vietnamese]: 'Khối',
				},
				plural: {
					[Lang.English]: 'Blocks',
					[Lang.Vietnamese]: 'Các khối',
				},
			},
			type: 'blocks',
			blocks: [CallToActionPostBlockConf, PostsGridBlockConf],
		},
		...slugField(),
		FooterSizeField,
	],
	hooks: {
		afterChange: [revalidateHeaderForCollection],
	},
}
