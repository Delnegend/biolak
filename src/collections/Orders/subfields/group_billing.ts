import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

export const ORDERS_tab_billing: Field = {
	type: 'group',
	name: 'billing',
	label: {
		[Lang.English]: 'Billing',
		[Lang.Vietnamese]: 'Thông tin thanh toán',
	},
	fields: [
		{
			name: 'method',
			type: 'select',
			label: {
				[Lang.English]: 'Payment Method',
				[Lang.Vietnamese]: 'Phương thức thanh toán',
			},
			admin: {
				placeholder: 'Chọn phương thức thanh toán',
			},
			defaultValue: 'cod',
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			options: [
				{
					value: 'cod',
					label: {
						[Lang.English]: 'Cash on Delivery',
						[Lang.Vietnamese]: 'Thanh toán khi nhận hàng',
					},
				},
				{
					value: 'bankTransfer',
					label: {
						[Lang.English]: 'Bank Transfer',
						[Lang.Vietnamese]: 'Chuyển khoản ngân hàng',
					},
				},
			],
		},
		{
			name: 'transactions',
			type: 'array',
			label: {
				[Lang.English]: 'Transactions',
				[Lang.Vietnamese]: 'Các lần giao dịch',
			},
			fields: [
				{
					name: 'id',
					type: 'text',
					label: {
						[Lang.English]: 'Transaction ID',
						[Lang.Vietnamese]: 'ID giao dịch',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'transactionDate',
					type: 'date',
					label: {
						[Lang.English]: 'Transaction Date',
						[Lang.Vietnamese]: 'Ngày giao dịch',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'code',
					type: 'text',
					label: {
						[Lang.English]: 'Code',
						[Lang.Vietnamese]: 'Mã code thanh toán',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'content',
					type: 'text',
					label: {
						[Lang.English]: 'Content',
						[Lang.Vietnamese]: 'Nội dung chuyển khoản',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'transferAmount',
					type: 'number',
					label: {
						[Lang.English]: 'Transfer Amount',
						[Lang.Vietnamese]: 'Số tiền chuyển khoản',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'referenceCode',
					type: 'text',
					label: {
						[Lang.English]: 'Reference Code',
						[Lang.Vietnamese]: 'Mã tham chiếu',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'description',
					type: 'text',
					label: {
						[Lang.English]: 'Description',
						[Lang.Vietnamese]: 'Mô tả',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
			],
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
		},
	],
}
