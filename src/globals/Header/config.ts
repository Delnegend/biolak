import { revalidateTag } from 'next/cache'
import type { Field, GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { LinkFieldRelations } from '@/fields/link'

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
					en: 'Functional button',
					vi: 'Nút chức năng',
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
				relationTo: [...LinkFieldRelations],
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
				localized: true,
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
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
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
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating header`)

					revalidateTag(HeaderGlobalSlug)
				}

				return doc
			},
		],
	},
}
