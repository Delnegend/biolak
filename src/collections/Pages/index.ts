import { BestSellerBlockConf } from '@/blocks/BestSeller/config'
import { CallToActionLeftBlockConf } from '@/blocks/CallToActionLeft/config'
import { CallToActionRightBlockConf } from '@/blocks/CallToActionRight/config'
import { CallToAddToCartBlockConf } from '@/blocks/CallToAddToCart/config'
import { CertificatesBlockConf } from '@/blocks/Certificates/config'
import { InfiniteScrollBlockConf } from '@/blocks/InfiniteScroll/config'
import { LatestPostsBlockConf } from '@/blocks/LatestPosts/config'
import { ProductsCarouselBlockConf } from '@/blocks/ProductsCarousel/config'
import { ThreePhotoBlockConf } from '@/blocks/ThreePhoto/config'
import { linkGroup } from '@/fields/linkGroup'
import { SeoFieldConf } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { CollectionConf } from '@/utilities/types'

import { admin } from '../../access/admin'
import { adminOrPublished } from '../../access/adminOrPublished'
import { ArchiveBlockConf } from '../../blocks/ArchiveBlock/config'
import { CallToActionCenterBlockConf } from '../../blocks/CallToActionCenter/config'
import { ContentBlockConf } from '../../blocks/Content/config'
import { FormBlockConf } from '../../blocks/Form/config'
import { MediaBlockConf } from '../../blocks/MediaBlock/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { Media } from '../Media'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConf<'pages'> = {
	slug: 'pages',
	labels: {
		singular: {
			en: 'Page',
			vi: 'Trang',
		},
		plural: {
			en: 'Pages',
			vi: 'Trang',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: adminOrPublished,
		update: admin,
	},
	// This config controls what's populated by default when a page is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
	defaultPopulate: {
		title: true,
		slug: true,
	},
	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'pages',
					req,
				})

				return path
			},
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'pages',
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
					label: 'Hero',
					fields: [
						{
							name: 'hero',
							type: 'group',
							access: {
								create: admin,
								read: () => true,
								update: admin,
							},
							fields: [
								{
									name: 'type',
									type: 'select',
									defaultValue: 'lowImpact',
									label: {
										en: 'Type',
										vi: 'Kiểu',
									},
									options: [
										{
											value: 'none',
											label: {
												en: 'None',
												vi: 'Không có',
											},
										},
										{
											value: 'highImpact',
											label: {
												en: 'High Impact',
												vi: 'Tác động lớn',
											},
										},
										{
											value: 'mediumImpact',
											label: {
												en: 'Medium Impact',
												vi: 'Tác động vừa phải',
											},
										},
										{
											value: 'lowImpact',
											label: {
												en: 'Low Impact',
												vi: 'Tác động thấp',
											},
										},
									],
									required: true,
								},
								{
									name: 'title',
									type: 'textarea',
									label: {
										en: 'Title',
										vi: 'Tiêu đề',
									},
								},
								{
									name: 'subtitle',
									type: 'textarea',
									label: {
										en: 'Subtitle',
										vi: 'Tiêu đề phụ',
									},
								},
								{
									name: 'description',
									type: 'richText',
									label: {
										en: 'Description',
										vi: 'Mô tả',
									},
								},
								linkGroup({
									overrides: {
										maxRows: 2,
									},
								}),
								{
									name: 'media',
									type: 'upload',
									label: {
										en: 'Media',
										vi: 'Phương tiện',
									},
									relationTo: Media.slug,
								},
							],
							label: false,
						},
					],
				},
				{
					label: {
						en: 'Content',
						vi: 'Nội dung',
					},
					fields: [
						{
							name: 'layout',
							type: 'blocks',
							blocks: [
								ArchiveBlockConf,
								BestSellerBlockConf,
								CallToAddToCartBlockConf,
								CallToActionCenterBlockConf,
								CallToActionLeftBlockConf,
								CallToActionRightBlockConf,
								CertificatesBlockConf,
								ContentBlockConf,
								FormBlockConf,
								InfiniteScrollBlockConf,
								LatestPostsBlockConf,
								MediaBlockConf,
								ProductsCarouselBlockConf,
								ThreePhotoBlockConf,
							],
							required: true,
							admin: {
								initCollapsed: true,
							},
							labels: {
								singular: {
									en: 'Block',
									vi: 'Khối',
								},
								plural: {
									en: 'Blocks',
									vi: 'Các khối',
								},
							},
						},
					],
				},
				{
					name: 'meta',
					label: 'SEO',
					fields: [SeoFieldConf],
				},
			],
		},
		{
			name: 'publishedAt',
			type: 'date',
			admin: {
				position: 'sidebar',
			},
			label: {
				en: 'Published At',
				vi: 'Ngày xuất bản',
			},
		},
		...slugField(),
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
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
