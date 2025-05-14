import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

const options = [
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
]

export const HeaderGlobalSlug = 'headerGlobal'
export const HeaderGlobalConf: GlobalConfig<typeof HeaderGlobalSlug> = {
	slug: HeaderGlobalSlug,
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'navItemsLeft',
			type: 'array',
			fields: [
				{
					name: 'item',
					type: 'select',
					options,
				},
			],
		},
		{
			name: 'navItemsRight',
			type: 'array',
			fields: [
				{
					name: 'item',
					type: 'select',
					options,
				},
			],
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
