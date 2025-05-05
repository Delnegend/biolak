import { CollectionConf } from '@/utilities/types'

import { admin } from '../../access/admin'

export const Users: CollectionConfig = {
	slug: 'users',
	labels: {
		singular: {
			en: 'User',
			vi: 'Người dùng',
		},
		plural: {
			en: 'Users',
			vi: 'Người dùng',
		},
	},
	access: {
		admin: admin,
		create: admin,
		delete: admin,
		read: admin,
		update: admin,
	},
	admin: {
		defaultColumns: ['name', 'email', 'role'],
		useAsTitle: 'name',
	},
	auth: true,
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
			name: 'role',
			type: 'select',
			required: true,
			options: [
				{
					label: {
						en: 'Admin',
						vi: 'Quản trị viên',
					},
					value: 'admin',
				},
				{
					label: {
						en: 'Customer',
						vi: 'Khách hàng',
					},
					value: 'customer',
				},
			],
			access: {
				update: () => false,
			},
			label: {
				en: 'Role',
				vi: 'Quyền',
			},
		},
	],
	timestamps: true,
}
