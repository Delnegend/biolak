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
import { VideoEmbedBlockConf } from '@/blocks/VideoEmbed/config'
import { FooterSizeField } from '@/fields/footer'
import { metaTab } from '@/fields/metaTab'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { Lang } from '@/utilities/lang'

import { MediaSlug } from '../Media/slug'
import { OrdersSlug } from '../Orders/slug'
import { ProductCategoriesSlug } from '../ProductCategories/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { ProductsSlug } from './slug'

export const ProductsCollection: CollectionConfig<typeof ProductsSlug> = {
	slug: ProductsSlug,
	labels: {
		singular: {
			[Lang.English]: 'Product',
			[Lang.Vietnamese]: 'Sản phẩm',
		},
		plural: {
			[Lang.English]: 'Products',
			[Lang.Vietnamese]: 'Sản phẩm',
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
						[Lang.English]: 'General',
						[Lang.Vietnamese]: 'Thông tin chung',
					},
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: ProductCategoriesSlug,
									type: 'relationship',
									relationTo: ProductCategoriesSlug,
									label: {
										[Lang.English]: 'Product Categories',
										[Lang.Vietnamese]: 'Danh mục sản phẩm',
									},
									hasMany: true,
								},
								{
									name: ProductSubCategoriesSlug,
									type: 'relationship',
									relationTo: ProductSubCategoriesSlug,
									label: {
										[Lang.English]: 'Product Subcategories',
										[Lang.Vietnamese]: 'Danh mục con sản phẩm',
									},
									hasMany: true,
								},
							],
						},
						{
							type: 'row',
							fields: [
								{
									name: 'title',
									type: 'text',
									label: {
										[Lang.English]: "Product's title",
										[Lang.Vietnamese]: 'Tên sản phẩm',
									},
									required: true,
									localized: true,
								},
								{
									name: 'shortDescription',
									type: 'text',
									label: {
										[Lang.English]: 'Short Description',
										[Lang.Vietnamese]: 'Mô tả ngắn',
									},
									localized: true,
								},
							],
						},
						{
							name: 'longDescription',
							type: 'richText',
							label: {
								[Lang.English]: 'Long Description',
								[Lang.Vietnamese]: 'Mô tả chi tiết',
							},
							localized: true,
						},
						{
							name: 'variants',
							type: 'array',
							label: {
								[Lang.English]: 'Variants',
								[Lang.Vietnamese]: 'Các loại',
							},
							labels: {
								singular: {
									[Lang.English]: 'Variant',
									[Lang.Vietnamese]: 'Loại',
								},
								plural: {
									[Lang.English]: 'Variants',
									[Lang.Vietnamese]: 'Các loại',
								},
							},
							fields: [
								{
									type: 'row',
									fields: [
										{
											name: 'title',
											type: 'text',
											label: {
												[Lang.English]: "Variant's title",
												[Lang.Vietnamese]: 'Tên loại',
											},
											required: true,
											localized: true,
										},
										{
											name: 'sku',
											type: 'text',
											label: {
												[Lang.English]: "Variant's SKU",
												[Lang.Vietnamese]: 'Mã SKU loại',
											},
											required: true,
										},
									],
								},
								{
									type: 'row',
									fields: [
										{
											name: 'stock',
											type: 'number',
											label: {
												[Lang.English]: "Variant's stock",
												[Lang.Vietnamese]: 'Số lượng tồn kho',
											},
											required: true,
										},
										{
											name: 'price',
											type: 'number',
											label: {
												[Lang.English]: "Variant's price",
												[Lang.Vietnamese]: 'Giá loại',
											},
											required: true,
										},
									],
								},
								{
									name: 'defaultVariant',
									type: 'checkbox',
									label: {
										[Lang.English]: 'Default variant',
										[Lang.Vietnamese]: 'Loại mặc định',
									},
								},
								{
									name: 'image',
									type: 'upload',
									label: {
										[Lang.English]: "Variant's image",
										[Lang.Vietnamese]: 'Ảnh loại',
									},
									relationTo: MediaSlug,
								},
							],
							required: true,
							minRows: 1,
						},
						{
							name: 'icon',
							type: 'upload',
							label: {
								[Lang.English]: "Product's icon",
								[Lang.Vietnamese]: 'Biểu tượng sản phẩm',
							},
							relationTo: MediaSlug,
							admin: {
								description: {
									[Lang.English]: 'This icon will be used in the product dropdown list.',
									[Lang.Vietnamese]:
										'Biểu tượng này sẽ được sử dụng trong danh sách thả xuống của sản phẩm.',
								},
							},
						},
						{
							name: 'gallery',
							type: 'upload',
							label: {
								[Lang.English]: 'Gallery',
								[Lang.Vietnamese]: 'Thư viện ảnh',
							},
							relationTo: MediaSlug,
							hasMany: true,
						},
						{
							name: 'reviewsVisible',
							label: {
								[Lang.English]: 'Reviews Visible',
								[Lang.Vietnamese]: 'Hiển thị đánh giá',
							},
							type: 'radio',
							access: {
								read: allow(Role.Admin, Role.ContentManager),
								update: allow(Role.Admin, Role.ContentManager),
								create: allow(Role.Admin, Role.ContentManager),
							},
							options: [
								{
									value: 'show',
									label: {
										[Lang.English]: 'Show',
										[Lang.Vietnamese]: 'Hiển thị',
									},
								},
								{
									value: 'hide',
									label: {
										[Lang.English]: 'Hide',
										[Lang.Vietnamese]: 'Ẩn',
									},
								},
							],
							defaultValue: 'show',
						},
					],
				},
				{
					label: {
						[Lang.English]: 'Content',
						[Lang.Vietnamese]: 'Nội dung',
					},
					fields: [
						{
							name: 'productLayout',
							type: 'blocks',
							label: {
								[Lang.English]: 'Page Layout',
								[Lang.Vietnamese]: 'Bố cục trang',
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
							required: true,
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
								VideoEmbedBlockConf,
							],
						},
					],
				},
				{
					label: {
						[Lang.English]: 'Orders',
						[Lang.Vietnamese]: 'Đơn hàng',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						create: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.Admin, Role.SalesManager),
					},
					fields: [
						{
							name: OrdersSlug,
							label: {
								[Lang.English]: 'Orders',
								[Lang.Vietnamese]: 'Đơn hàng',
							},
							type: 'join',
							collection: OrdersSlug,
							on: 'cart.product',
							access: {
								read: allow(Role.Admin, Role.SalesManager),
							},
							admin: {
								disableListColumn: true,
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
					collection: ProductsSlug,
					req,
				}),
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: ProductsSlug,
				req,
			}),
	},
}
