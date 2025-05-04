import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { CollectionConfig, CollectionSlug } from 'payload'
import { Media } from './Media'
import { PRODUCT_CATEGORIES_SLUG } from './ProductCategories'
import { PRODUCT_SUB_CATEGORY_SLUG } from './ProductSubCategories'

export const Product: CollectionConfig<'products'> = {
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
			name: PRODUCT_CATEGORIES_SLUG,
			type: 'relationship',
			relationTo: PRODUCT_CATEGORIES_SLUG,
			label: {
				en: 'Product Categories',
				vi: 'Danh mục sản phẩm',
			},
		},
		{
			name: PRODUCT_SUB_CATEGORY_SLUG,
			type: 'relationship',
			relationTo: PRODUCT_SUB_CATEGORY_SLUG,
			label: {
				en: 'Product Sub Categories',
				vi: 'Danh mục con sản phẩm',
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
				singular: 'Image',
				plural: 'Images',
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: Media.slug as CollectionSlug,
					label: 'Image',
					required: true,
				},
			],
		},
	],
	admin: {
		useAsTitle: 'title',
	},
}
