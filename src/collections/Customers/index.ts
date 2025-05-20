import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'

import { OrdersSlug } from '../Orders/slug'
import { CustomersSlug } from './slug'

export const CustomersCollection: CollectionConfig<typeof CustomersSlug> = {
	slug: CustomersSlug,
	labels: {
		singular: {
			en: 'Customer',
			vi: 'Khách hàng',
		},
		plural: {
			en: 'Customers',
			vi: 'Khách hàng',
		},
	},
	access: {
		create: allow(Role.Admin, Role.SalesManager),
		read: allow(Role.Admin, Role.SalesManager),
		update: allow(Role.Admin, Role.SalesManager),
		delete: allow(Role.NoOne),
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			label: {
				en: 'Name',
				vi: 'Tên',
			},
		},
		{
			name: 'email',
			type: 'email',
			label: {
				en: 'Email',
				vi: 'Email',
			},
		},
		{
			name: 'phoneNumber',
			type: 'text',
			label: {
				en: 'Phone Number',
				vi: 'Số điện thoại',
			},
		},
		{
			name: 'address',
			type: 'text',
			label: {
				en: 'Address',
				vi: 'Địa chỉ',
			},
		},
		{
			name: OrdersSlug,
			type: 'join',
			label: {
				en: 'Orders',
				vi: 'Đơn hàng',
			},
			collection: OrdersSlug,
			on: CustomersSlug,
		},
	],
	admin: {
		useAsTitle: 'name',
	},
	timestamps: true,
}
