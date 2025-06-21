import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { ArchiveBlockConf } from '@/blocks/ArchiveBlock/config'
import { BuyNowBlockConf } from '@/blocks/BuyNow/config'
import { CallToActionCenterBlockConf } from '@/blocks/CallToActionCenter/config'
import { CallToActionLeftBlockConf } from '@/blocks/CallToActionLeft/config'
import { CallToActionRightBlockConf } from '@/blocks/CallToActionRight/config'
import { CallToAddToCartBlockConf } from '@/blocks/CallToAddToCart/config'
import { CertificatesBlockConf } from '@/blocks/Certificates/config'
import { ContentBlockConf } from '@/blocks/Content/config'
import { FocusLeftSmallImageBlockConf } from '@/blocks/FocusLeftSmallImage/config'
import { FocusRightLargeImageBlockConf } from '@/blocks/FocusRightLargeImage/config'
import { FocusRightSmallImageBlockConf } from '@/blocks/FocusRightSmallImage/config'
import { FormBlockConf } from '@/blocks/Form/config'
import { HighlightCenterBlockConf } from '@/blocks/HighlightCenter/config'
import { HighlightLeftBlockConf } from '@/blocks/HighlightLeft/config'
import { HighlighRightBlockConf } from '@/blocks/HighlightRight/config'
import { InfiniteScrollBlockConf } from '@/blocks/InfiniteScroll/config'
import { ProductsCarouselBlockConf } from '@/blocks/ProductsCarousel/config'
import { ProductsCategoryBlockConf } from '@/blocks/ProductsCategory/config'
import { ThreePhotoBlockConf } from '@/blocks/ThreePhoto/config'
import { FooterSizeField } from '@/fields/footer'
import { metaTab } from '@/fields/metaTab'
import { slugField } from '@/fields/slug'
import { revalidateHeaderForCollection } from '@/globals/Header/hooks/revalidateHeader'
import { Lang } from '@/utilities/lang'

import { adminOrPublished } from '../../access/adminOrPublished'
import { MediaBlockConf } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { PostCategoriesSlug } from '../PostCategories/slug'
import { UsersSlug } from '../Users/slug'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { PostsSlug } from './slug'

export const PostsCollection: CollectionConfig<typeof PostsSlug> = {
	slug: PostsSlug,
	labels: {
		singular: {
			[Lang.English]: 'Post',
			[Lang.Vietnamese]: 'Bài viết',
		},
		plural: {
			[Lang.English]: 'Posts',
			[Lang.Vietnamese]: 'Bài viết',
		},
	},
	access: {
		create: allow(Role.Admin, Role.ContentManager),
		delete: allow(Role.Admin, Role.ContentManager),
		read: adminOrPublished,
		update: allow(Role.Admin, Role.ContentManager),
	},
	// This config controls what's populated by default when a post is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
	defaultPopulate: {
		title: true,
		slug: true,
		[PostCategoriesSlug]: true,
		meta: {
			meta: {
				image: true,
				description: true,
			},
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
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			type: 'tabs',
			tabs: [
				{
					label: {
						[Lang.English]: 'Content',
						[Lang.Vietnamese]: 'Nội dung',
					},
					fields: [
						{
							name: 'layout',
							type: 'blocks',
							blocks: [
								ArchiveBlockConf,
								BuyNowBlockConf,
								CallToActionCenterBlockConf,
								CallToActionLeftBlockConf,
								CallToActionRightBlockConf,
								CallToAddToCartBlockConf,
								CertificatesBlockConf,
								ContentBlockConf,
								FocusLeftSmallImageBlockConf,
								FocusRightLargeImageBlockConf,
								FocusRightSmallImageBlockConf,
								FormBlockConf,
								HighlighRightBlockConf,
								HighlightCenterBlockConf,
								HighlightLeftBlockConf,
								InfiniteScrollBlockConf,
								MediaBlockConf,
								ProductsCarouselBlockConf,
								ProductsCategoryBlockConf,
								ThreePhotoBlockConf,
							],
							required: true,
							admin: {
								initCollapsed: true,
							},
							label: false,
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
							relationTo: PostsSlug,
							label: {
								[Lang.English]: 'Related Posts',
								[Lang.Vietnamese]: 'Bài viết liên quan',
							},
						},
						{
							name: PostCategoriesSlug,
							type: 'relationship',
							admin: {
								position: 'sidebar',
							},
							hasMany: true,
							relationTo: PostCategoriesSlug,
							label: {
								[Lang.English]: 'Post Categories',
								[Lang.Vietnamese]: 'Danh mục bài viết',
							},
						},
					],
					label: 'Meta',
				},
				metaTab,
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
				[Lang.English]: 'Published At',
				[Lang.Vietnamese]: 'Ngày xuất bản',
			},
		},
		{
			name: 'authors',
			type: 'relationship',
			admin: {
				position: 'sidebar',
			},
			hasMany: true,
			relationTo: UsersSlug,
			label: {
				[Lang.English]: 'Authors',
				[Lang.Vietnamese]: 'Tác giả',
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
				[Lang.English]: 'Populated Authors',
				[Lang.Vietnamese]: 'Tác giả đã được phân bổ',
			},
		},
		...slugField(),
		FooterSizeField,
	],
	hooks: {
		afterChange: [revalidatePost, revalidateHeaderForCollection],
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
