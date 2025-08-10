import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

export const ORDERS_tab_shipping_info: Field = {
	type: 'group',
	name: 'shippingInfo',
	label: {
		[Lang.English]: 'Shipping',
		[Lang.Vietnamese]: 'Giao hàng',
	},
	fields: [
		{
			name: 'method',
			type: 'select',
			label: {
				[Lang.English]: 'Shipping Method',
				[Lang.Vietnamese]: 'Phương thức giao hàng',
			},
			admin: {
				placeholder: 'Giao hàng tiêu chuẩn',
			},
			defaultValue: 'standard',
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.Admin, Role.SalesManager),
				create: allow(Role.Admin, Role.SalesManager),
			},
			options: [
				{
					value: 'standard',
					label: {
						[Lang.English]: 'Standard Shipping',
						[Lang.Vietnamese]: 'Giao hàng tiêu chuẩn',
					},
				},
				{
					value: 'express',
					label: {
						[Lang.English]: 'Express Shipping',
						[Lang.Vietnamese]: 'Giao hàng nhanh',
					},
				},
			],
		},
		{
			name: 'tracking',
			type: 'text',
			label: {
				[Lang.English]: 'Tracking Number',
				[Lang.Vietnamese]: 'Mã vận đơn',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.Admin, Role.SalesManager),
				create: allow(Role.Admin, Role.SalesManager),
			},
			admin: {
				description: {
					[Lang.English]: 'Get from the shipping provider',
					[Lang.Vietnamese]: 'Lấy từ nhà cung cấp vận chuyển',
				},
			},
		},
	],
}
