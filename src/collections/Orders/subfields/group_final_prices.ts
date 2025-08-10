import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { DiscountCodesSlug } from '@/collections/DiscountCode/slug'
import { Lang } from '@/utilities/lang'

export const ORDER_final_prices: Field = {
	name: 'prices',
	type: 'group',
	label: {
		[Lang.English]: 'Prices',
		[Lang.Vietnamese]: 'Giá',
	},
	fields: [
		{
			name: 'discountCode',
			type: 'relationship',
			relationTo: DiscountCodesSlug,
			label: {
				[Lang.English]: 'Applied discount code',
				[Lang.Vietnamese]: 'Mã giảm giá áp dụng',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
		},
		{
			name: 'provisional',
			type: 'number',
			label: {
				[Lang.English]: 'Provisional Total',
				[Lang.Vietnamese]: 'Tổng tạm tính',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			required: true,
			defaultValue: 0,
		},
		{
			name: 'shipping',
			type: 'number',
			label: {
				[Lang.English]: 'Shipping Fee',
				[Lang.Vietnamese]: 'Phí vận chuyển',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			required: true,
			defaultValue: 0,
		},
		{
			name: 'discount',
			type: 'number',
			label: {
				[Lang.English]: 'Discount',
				[Lang.Vietnamese]: 'Giảm giá',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			required: true,
			defaultValue: 0,
		},
		{
			name: 'total',
			type: 'number',
			label: {
				[Lang.English]: 'Total',
				[Lang.Vietnamese]: 'Thành tiền',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			required: true,
			defaultValue: 0,
		},
		{
			name: 'paidAmount',
			type: 'number',
			label: {
				[Lang.English]: 'Paid Amount',
				[Lang.Vietnamese]: 'Số tiền đã trả',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.Admin, Role.SalesManager),
				create: allow(Role.NoOne),
			},
		},
	],
}
