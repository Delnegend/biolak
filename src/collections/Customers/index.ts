import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { OrdersSlug } from '../Orders/slug'
import { CustomersSlug } from './slug'

export const CustomersCollection: CollectionConfig<typeof CustomersSlug> = {
	slug: CustomersSlug,
	labels: {
		singular: {
			[Lang.English]: 'Customer',
			[Lang.Vietnamese]: 'Khách hàng',
		},
		plural: {
			[Lang.English]: 'Customers',
			[Lang.Vietnamese]: 'Khách hàng',
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
				[Lang.English]: 'Name',
				[Lang.Vietnamese]: 'Tên',
			},
		},
		{
			name: 'email',
			type: 'email',
			label: {
				[Lang.English]: 'Email',
				[Lang.Vietnamese]: 'Email',
			},
			unique: true,
		},
		{
			name: 'phoneNumber',
			type: 'text',
			label: {
				[Lang.English]: 'Phone Number',
				[Lang.Vietnamese]: 'Số điện thoại',
			},
			unique: true,
		},
		{
			name: OrdersSlug,
			type: 'join',
			label: {
				[Lang.English]: 'Orders',
				[Lang.Vietnamese]: 'Đơn hàng',
			},
			collection: OrdersSlug,
			on: 'customer',
		},
	],
	admin: {
		useAsTitle: 'name',
	},
	timestamps: true,
}
