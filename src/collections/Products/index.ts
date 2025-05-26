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
import { FormBlockConf } from '@/blocks/Form/config'
import { HighlightCenterBlockConf } from '@/blocks/HighlightCenter/config'
import { HighlightLeftBlockConf } from '@/blocks/HighlightLeft/config'
import { HighlighRightBlockConf } from '@/blocks/HighlightRight/config'
import { HowToUseProductBlockConf } from '@/blocks/HowToUseProduct/config'
import { InfiniteScrollBlockConf } from '@/blocks/InfiniteScroll/config'
import { LatestPostsBlockConf } from '@/blocks/LatestPosts/config'
import { MediaBlockConf } from '@/blocks/MediaBlock/config'
import { ProductsCarouselBlockConf } from '@/blocks/ProductsCarousel/config'
import { ThreePhotoBlockConf } from '@/blocks/ThreePhoto/config'
import { FooterSizeField } from '@/fields/footer'
import { metaTab } from '@/fields/metaTab'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

import { MediaSlug } from '../Media/slug'
import { OrdersSlug } from '../Orders/slug'
import { ProductCategoriesSlug } from '../ProductCategories/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { ProductsSlug } from './slug'

export const ProductsCollection: CollectionConfig<typeof ProductsSlug> = {
	slug: ProductsSlug,
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
		create: allow(Role.Admin, Role.ContentManager),
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
		delete: allow(Role.Admin, Role.ContentManager),
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
							name: ProductCategoriesSlug,
							type: 'relationship',
							relationTo: ProductCategoriesSlug,
							label: {
								en: 'Product Categories',
								vi: 'Danh mục sản phẩm',
							},
							hasMany: true,
						},
						{
							name: ProductSubCategoriesSlug,
							type: 'relationship',
							relationTo: ProductSubCategoriesSlug,
							label: {
								en: 'Product Subcategories',
								vi: 'Danh mục con sản phẩm',
							},
							hasMany: true,
						},
						{
							name: 'title',
							type: 'text',
							label: {
								en: "Product's title",
								vi: 'Tên sản phẩm',
							},
							required: true,
							localized: true,
						},
						{
							name: 'shortDescription',
							type: 'text',
							label: {
								en: 'Short Description',
								vi: 'Mô tả ngắn',
							},
							required: true,
							localized: true,
						},
						{
							name: 'longDescription',
							type: 'richText',
							label: {
								en: 'Long Description',
								vi: 'Mô tả chi tiết',
							},
							localized: true,
						},
						{
							name: 'price',
							type: 'number',
							required: true,
							label: {
								en: 'Price (in Vietnamese dong)',
								vi: 'Giá (đơn vị: đồng)',
							},
						},
						{
							name: 'icon',
							type: 'upload',
							label: {
								en: "Product's icon",
								vi: 'Biểu tượng sản phẩm',
							},
							relationTo: MediaSlug,
						},
						{
							name: 'gallery',
							type: 'upload',
							label: {
								en: 'Gallery',
								vi: 'Thư viện ảnh',
							},
							relationTo: MediaSlug,
							hasMany: true,
						},
						{
							name: 'reviewsVisible',
							label: {
								en: 'Reviews Visible',
								vi: 'Hiển thị đánh giá',
							},
							type: 'radio',
							options: [
								{
									value: 'show',
									label: {
										en: 'Show',
										vi: 'Hiển thị',
									},
								},
								{
									value: 'hide',
									label: {
										en: 'Hide',
										vi: 'Ẩn',
									},
								},
							],
							defaultValue: 'show',
						},
					],
				},
				{
					label: 'Hero',
					fields: [
						{
							name: 'heroSubtitle',
							type: 'textarea',
							label: {
								en: 'Subtitle override',
								vi: 'Ghi đè tên sản phẩm (phụ đề)',
							},
							localized: true,
						},
						{
							name: 'heroTitle',
							type: 'textarea',
							label: {
								en: 'Title override',
								vi: 'Ghi đè mô tả ngắn (tiêu đề)',
							},
							localized: true,
						},
						{
							name: 'heroDescription',
							type: 'richText',
							label: {
								en: 'Description override',
								vi: 'Ghi đè mô tả',
							},
							localized: true,
						},
						{
							name: 'heroMedia',
							type: 'upload',
							label: {
								en: 'Media override',
								vi: 'Ghi đè ảnh sản phẩm',
							},
							relationTo: MediaSlug,
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
								BuyNowBlockConf,
								CallToActionCenterBlockConf,
								CallToActionLeftBlockConf,
								CallToActionRightBlockConf,
								CallToAddToCartBlockConf,
								CertificatesBlockConf,
								ContentBlockConf,
								FormBlockConf,
								HighlighRightBlockConf,
								HighlightCenterBlockConf,
								HighlightLeftBlockConf,
								HowToUseProductBlockConf,
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
					label: {
						en: 'Orders',
						vi: 'Đơn hàng',
					},
					fields: [
						{
							name: OrdersSlug,
							label: false,
							type: 'join',
							collection: OrdersSlug,
							on: ProductsSlug,
							access: {
								read: allow(Role.Admin, Role.SalesManager),
							},
						},
					],
				},
				metaTab,
			],
		},
		...slugField(),
		FooterSizeField,
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
