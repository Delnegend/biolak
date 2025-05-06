import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { ArchiveBlockConf } from '@/blocks/ArchiveBlock/config'
import { CallToActionCenterBlockConf } from '@/blocks/CallToActionCenter/config'
import { CallToActionLeftBlockConf } from '@/blocks/CallToActionLeft/config'
import { CallToActionRightBlockConf } from '@/blocks/CallToActionRight/config'
import { CallToAddToCartBlockConf } from '@/blocks/CallToAddToCart/config'
import { CertificatesBlockConf } from '@/blocks/Certificates/config'
import { ContentBlockConf } from '@/blocks/Content/config'
import { FormBlockConf } from '@/blocks/Form/config'
import { InfiniteScrollBlockConf } from '@/blocks/InfiniteScroll/config'
import { LatestPostsBlockConf } from '@/blocks/LatestPosts/config'
import { MediaBlockConf } from '@/blocks/MediaBlock/config'
import { ProductsCarouselBlockConf } from '@/blocks/ProductsCarousel/config'
import { ThreePhotoBlockConf } from '@/blocks/ThreePhoto/config'
import { SeoFieldConf } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConf } from '@/utilities/types'

import { Media } from './Media'
import { ProductCategories } from './ProductCategories'
import { ProductSubCategories } from './ProductSubCategories'

export const Products: CollectionConf<'products'> = {
	slug: 'products',
	labels: {
		singular: {
			en: 'Product',
			vi: 'Sản phẩm',
		},
		plural: {
			en: 'Products',
			vi: 'Sản phẩm',
		},
	},
	access: {
		create: admin,
		read: anyone,
		update: admin,
		delete: admin,
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: {
						en: 'General',
						vi: 'Thông tin chung',
					},
					fields: [
						{
							name: 'category',
							type: 'relationship',
							relationTo: [ProductCategories.slug, ProductSubCategories.slug],
							label: {
								en: 'Product Categories',
								vi: 'Danh mục sản phẩm',
							},
						},
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
							name: 'shortDescription',
							type: 'text',
							required: true,
							label: {
								en: 'Short Description',
								vi: 'Mô tả ngắn',
							},
						},
						{
							name: 'longDescription',
							type: 'text',
							label: {
								en: 'Long Description',
								vi: 'Mô tả chi tiết',
							},
						},
						{
							name: 'price',
							type: 'number',
							required: true,
							label: {
								en: 'Price',
								vi: 'Giá',
							},
						},
						{
							name: 'gallery',
							type: 'array',
							label: {
								en: 'Gallery',
								vi: 'Thư viện ảnh',
							},
							minRows: 0,
							maxRows: 50,
							labels: {
								singular: {
									en: 'Image',
									vi: 'Hình ảnh',
								},
								plural: {
									en: 'Images',
									vi: 'Hình ảnh',
								},
							},
							fields: [
								{
									name: 'image',
									type: 'upload',
									relationTo: Media.slug,
									label: {
										en: 'Image',
										vi: 'Hình ảnh',
									},
									required: true,
								},
							],
						},
					],
				},
				{
					label: 'Hero',
					fields: [
						{
							name: 'heroTitle',
							type: 'textarea',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
						},
						{
							name: 'heroSubtitle',
							type: 'textarea',
							label: {
								en: 'Subtitle',
								vi: 'Tiêu đề phụ',
							},
						},
						{
							name: 'heroDescription',
							type: 'richText',
							label: {
								en: 'Description',
								vi: 'Mô tả',
							},
						},
						{
							name: 'heroMedia',
							type: 'upload',
							label: {
								en: 'Media',
								vi: 'Phương tiện',
							},
							relationTo: Media.slug,
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
							name: 'content',
							type: 'blocks',
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
							label: {
								en: 'Content',
								vi: 'Nội dung',
							},
							blocks: [
								ArchiveBlockConf,
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
						},
					],
				},
				{
					label: 'SEO',
					fields: [SeoFieldConf],
				},
			],
		},
		...slugField(),
	],
	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		useAsTitle: 'title',
		livePreview: {
			url: ({ data, req }) =>
				generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'products',
					req,
				}),
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'products',
				req,
			}),
	},
}
