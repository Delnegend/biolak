import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
	BlocksFeature,
	FixedToolbarFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { slugField } from '@/fields/slug'
import { CollectionConf } from '@/utilities/types'

import { admin } from '../../access/admin'
import { adminOrPublished } from '../../access/adminOrPublished'
import { BannerBlockConf } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlockConf } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { Media } from '../Media'
import { PostCategories } from '../PostCategories'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConf<'posts'> = {
	slug: 'posts',
	labels: {
		singular: {
			en: 'Post',
			vi: 'Bài viết',
		},
		plural: {
			en: 'Posts',
			vi: 'Bài viết',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: adminOrPublished,
		update: admin,
	},
	// This config controls what's populated by default when a post is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
	defaultPopulate: {
		title: true,
		slug: true,
		[PostCategories.slug]: true,
		meta: {
			image: true,
			description: true,
		},
	},
	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		livePreview: {
			url: ({ data, req }) =>
				generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'posts',
					req,
				}),
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'posts',
				req,
			}),
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
			type: 'tabs',
			tabs: [
				{
					label: {
						en: 'Content',
						vi: 'Nội dung',
					},
					fields: [
						{
							name: 'heroImage',
							type: 'upload',
							relationTo: Media.slug,
						},
						{
							name: 'content',
							type: 'richText',
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										BlocksFeature({ blocks: [BannerBlockConf, Code, MediaBlockConf] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
									]
								},
							}),
							label: false,
							required: true,
						},
					],
				},
				{
					fields: [
						{
							name: 'relatedPosts',
							type: 'relationship',
							admin: {
								position: 'sidebar',
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id],
									},
								}
							},
							hasMany: true,
							relationTo: 'posts',
							label: {
								en: 'Related Posts',
								vi: 'Bài viết liên quan',
							},
						},
						{
							name: PostCategories.slug,
							type: 'relationship',
							admin: {
								position: 'sidebar',
							},
							hasMany: true,
							relationTo: PostCategories.slug,
							label: {
								en: 'Post Categories',
								vi: 'Danh mục bài viết',
							},
						},
					],
					label: 'Meta',
				},
				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image',
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: Media.slug,
						}),

						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
						}),
					],
				},
			],
		},
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
				},
				position: 'sidebar',
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === 'published' && !value) {
							return new Date()
						}
						return value
					},
				],
			},
			label: {
				en: 'Published At',
				vi: 'Ngày xuất bản',
			},
		},
		{
			name: 'authors',
			type: 'relationship',
			admin: {
				position: 'sidebar',
			},
			hasMany: true,
			relationTo: 'users',
			label: {
				en: 'Authors',
				vi: 'Tác giả',
			},
		},
		// This field is only used to populate the user data via the `populateAuthors` hook
		// This is because the `user` collection has access control locked to protect user privacy
		// GraphQL will also not return mutated user data that differs from the underlying schema
		{
			name: 'populatedAuthors',
			type: 'array',
			access: {
				update: () => false,
			},
			admin: {
				disabled: true,
				readOnly: true,
			},
			fields: [
				{
					name: 'id',
					type: 'text',
				},
				{
					name: 'name',
					type: 'text',
				},
			],
			label: {
				en: 'Populated Authors',
				vi: 'Tác giả đã được phân bổ',
			},
		},
		...slugField(),
	],
	hooks: {
		afterChange: [revalidatePost],
		afterRead: [populateAuthors],
		afterDelete: [revalidateDelete],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
}
