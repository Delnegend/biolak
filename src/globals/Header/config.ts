import type { Field, GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { LinkFieldRelations } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { revalidateHeader } from './hooks/revalidateHeader'
import { HeaderGlobalSlug } from './slug'

const fields: Field[] = [
	{
		name: 'kind',
		type: 'radio',
		label: {
			[Lang.Vietnamese]: 'Loại liên kết',
			[Lang.English]: 'Link type',
		},
		options: [
			{
				value: 'prebuilt',
				label: {
					[Lang.English]: 'Functional button',
					[Lang.Vietnamese]: 'Nút chức năng',
				},
			},
			{
				value: 'internalUrl',
				label: {
					[Lang.English]: 'Link to internal page',
					[Lang.Vietnamese]: 'Liên kết trang nội bộ',
				},
			},
			{
				value: 'customUrl',
				label: {
					[Lang.English]: 'Custom URL',
					[Lang.Vietnamese]: 'Liên kết tùy chỉnh',
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
					[Lang.Vietnamese]: 'Chức năng',
					[Lang.English]: 'Prebuilt',
				},
				admin: {
					condition: (_, siblingData) => siblingData?.kind === 'prebuilt',
				},
				options: [
					{
						label: {
							[Lang.Vietnamese]: 'Tìm kiếm',
							[Lang.English]: 'Search',
						},
						value: 'search',
					},
					{
						label: {
							[Lang.Vietnamese]: 'Sản phẩm',
							[Lang.English]: 'Products',
						},
						value: 'products',
					},
					{
						label: {
							[Lang.Vietnamese]: 'BioLAK',
							[Lang.English]: 'BioLAK',
						},
						value: 'about',
					},
					{
						label: {
							[Lang.English]: 'Contact',
							[Lang.Vietnamese]: 'Liên hệ',
						},
						value: 'contact',
					},
					{
						label: {
							[Lang.English]: 'VIE/EN',
							[Lang.Vietnamese]: 'VIE/EN',
						},
						value: 'vie-en',
					},
					{
						label: {
							[Lang.English]: 'Cart',
							[Lang.Vietnamese]: 'Giỏ hàng',
						},
						value: 'cart',
					},
				],
				required: true,
			},
			{
				name: 'customUrl',
				type: 'text',
				label: {
					[Lang.English]: 'Custom URL',
					[Lang.Vietnamese]: 'Liên kết tùy chỉnh',
				},
				admin: {
					condition: (_, siblingData) => siblingData?.kind === 'customUrl',
				},
				required: true,
			},
			{
				name: 'internalUrl',
				type: 'relationship',
				relationTo: [...LinkFieldRelations],
				label: {
					[Lang.English]: 'Link to internal page',
					[Lang.Vietnamese]: 'Liên kết trang nội bộ',
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
					[Lang.English]: 'Label',
					[Lang.Vietnamese]: 'Nhãn',
				},
				localized: true,
			},
		],
	},
]

export const HeaderGlobalConf: GlobalConfig<typeof HeaderGlobalSlug> = {
	slug: HeaderGlobalSlug,
	label: {
		[Lang.English]: 'Header',
		[Lang.Vietnamese]: 'Thanh tiêu đề',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'headerItemsLeft',
			label: {
				[Lang.English]: 'Header Items Left',
				[Lang.Vietnamese]: 'Các mục tiêu đề trái',
			},
			labels: {
				singular: {
					[Lang.English]: 'Header Item Left',
					[Lang.Vietnamese]: 'Mục tiêu đề trái',
				},
				plural: {
					[Lang.English]: 'Header Items Left',
					[Lang.Vietnamese]: 'Các mục tiêu đề trái',
				},
			},
			type: 'array',
			fields,
		},
		{
			name: 'headerItemsRight',
			label: {
				[Lang.English]: 'Header Items Right',
				[Lang.Vietnamese]: 'Các mục tiêu đề phải',
			},
			labels: {
				singular: {
					[Lang.English]: 'Header Item Right',
					[Lang.Vietnamese]: 'Mục tiêu đề phải',
				},
				plural: {
					[Lang.English]: 'Header Items Right',
					[Lang.Vietnamese]: 'Các mục tiêu đề phải',
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
		{
			name: 'logo',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Logo',
				[Lang.Vietnamese]: 'Logo',
			},
		},
	],
	hooks: {
		afterChange: [revalidateHeader],
	},
}
