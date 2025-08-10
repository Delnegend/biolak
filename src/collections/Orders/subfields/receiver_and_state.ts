import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { CustomersSlug } from '@/collections/Customers/slug'
import { Lang } from '@/utilities/lang'

export const ORDERS_customer: Field[] = [
	{
		type: 'relationship',
		relationTo: CustomersSlug,
		name: 'customer',
		label: {
			[Lang.English]: 'Customer',
			[Lang.Vietnamese]: 'Khách hàng',
		},
		required: true,
		access: {
			read: allow(Role.Admin, Role.SalesManager),
			update: allow(Role.Admin, Role.SalesManager),
			create: allow(Role.Admin, Role.SalesManager),
		},
	},
	{
		name: 'receiverName',
		type: 'text',
		label: {
			[Lang.English]: "Receiver's name",
			[Lang.Vietnamese]: 'Tên người nhận',
		},
	},
	{
		name: 'receiverPhoneNumber',
		type: 'text',
		label: {
			[Lang.English]: "Receiver's phone number",
			[Lang.Vietnamese]: 'Số điện thoại người nhận',
		},
	},
	{
		name: 'receiverAddress',
		type: 'textarea',
		label: {
			[Lang.English]: 'Shipping Address',
			[Lang.Vietnamese]: 'Địa chỉ giao hàng',
		},
	},
	{
		type: 'textarea',
		name: 'receiverNote',
		label: {
			[Lang.English]: 'Note',
			[Lang.Vietnamese]: 'Ghi chú',
		},
		access: {
			read: allow(Role.Admin, Role.SalesManager),
			update: allow(Role.Admin, Role.SalesManager),
			create: allow(Role.Admin, Role.SalesManager),
		},
	},
	{
		name: 'orderState',
		type: 'select',
		label: {
			[Lang.English]: 'Order State',
			[Lang.Vietnamese]: 'Trạng thái đơn hàng',
		},
		defaultValue: 'pending',
		options: [
			{
				label: {
					[Lang.English]: 'Pending',
					[Lang.Vietnamese]: 'Đang chờ',
				},
				value: 'pending',
			},
			{
				label: {
					[Lang.English]: 'Processing',
					[Lang.Vietnamese]: 'Đang xử lý',
				},
				value: 'processing',
			},
			{
				label: {
					[Lang.English]: 'Completed',
					[Lang.Vietnamese]: 'Đã hoàn thành',
				},
				value: 'completed',
			},
		],
	},
]
