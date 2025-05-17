import type { Field, GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'

import { revalidateHeader } from './hooks/revalidateHeader'

const fields: Field[] = [
	{
		name: 'kind',
		type: 'radio',
		label: {
			vi: 'Loại liên kết',
			en: 'Link type',
		},
		options: [
			{
				value: 'prebuilt',
				label: {
					en: 'Link to prebuilt',
					vi: 'Liên kết chức năng',
				},
			},
			{
				value: 'internalUrl',
				label: {
					en: 'Link to internal page',
					vi: 'Liên kết trang nội bộ',
				},
			},
			{
				value: 'customUrl',
				label: {
					en: 'Custom URL',
					vi: 'Liên kết tùy chỉnh',
				},
			},
		],
		defaultValue: 'internalUrl',
	},
	{
		type: 'row',
		fields: [
			{
				name: 'prebuilt',
				type: 'select',
				label: {
					vi: 'Chức năng',
					en: 'Prebuilt',
				},
				admin: {
					condition: (_, siblingData) => siblingData?.kind === 'prebuilt',
				},
				options: [
					{
						label: 'Tìm kiếm',
						value: 'search',
					},
					{
						label: 'Sản phẩm',
						value: 'products',
					},
					{
						label: 'BioLAK',
						value: 'about',
					},
					{
						label: 'Sự kiện',
						value: 'events',
					},
					{
						label: 'Liên hệ',
						value: 'contact',
					},
					{
						label: 'VIE/EN',
						value: 'vie-en',
					},
					{
						label: 'Giỏ hàng',
						value: 'cart',
					},
				],
				required: true,
			},
			{
				name: 'customUrl',
				type: 'text',
				label: {
					en: 'Custom URL',
					vi: 'Liên kết tùy chỉnh',
				},
				admin: {
					condition: (_, siblingData) => siblingData?.kind === 'customUrl',
				},
				required: true,
			},
			{
				name: 'internalUrl',
				type: 'relationship',
				relationTo: [
					PagesSlug,
					ProductsSlug,
					PostsSlug,
					PostCategoriesSlug,
					ProductCategoriesSlug,
					ProductSubCategoriesSlug,
				],
				label: {
					en: 'Link to internal page',
					vi: 'Liên kết trang nội bộ',
				},
				admin: {
					condition: (_, siblingData) => siblingData?.kind === 'internalUrl',
				},
				required: true,
			},
			{
				name: 'label',
				type: 'text',
				label: {
					en: 'Label',
					vi: 'Nhãn',
				},
			},
		],
	},
]

export const HeaderGlobalSlug = 'headerGlobal'
export const HeaderGlobalConf: GlobalConfig<typeof HeaderGlobalSlug> = {
	slug: HeaderGlobalSlug,
	label: {
		en: 'Header',
		vi: 'Thanh tiêu đề',
	},
	access: {
		read: anyone,
	},
	fields: [
		{
			name: 'headerItemsLeft',
			label: {
				en: 'Header Items Left',
				vi: 'Các mục tiêu đề trái',
			},
			labels: {
				singular: {
					en: 'Header Item Left',
					vi: 'Mục tiêu đề trái',
				},
				plural: {
					en: 'Header Items Left',
					vi: 'Các mục tiêu đề trái',
				},
			},
			type: 'array',
			fields,
		},
		{
			name: 'headerItemsRight',
			label: {
				en: 'Header Items Right',
				vi: 'Các mục tiêu đề phải',
			},
			labels: {
				singular: {
					en: 'Header Item Right',
					vi: 'Mục tiêu đề phải',
				},
				plural: {
					en: 'Header Items Right',
					vi: 'Các mục tiêu đề phải',
				},
			},
			type: 'array',
			fields,
			// admin: {
			//   not using but left for reference
			//   components: {
			//     RowLabel: '@/globals/Header/RowLabel#RowLabel',
			//   },
			// },
		},
	],
	hooks: {
		afterChange: [revalidateHeader],
	},
}
