import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'

import { UsersSlug } from './slug'

export const UsersCollection: CollectionConfig<typeof UsersSlug> = {
	slug: UsersSlug,
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
		admin: allow(Role.Admin),
		create: allow(Role.Admin),
		delete: allow(Role.Admin),
		read: allow(Role.Admin),
		update: allow(Role.Admin),
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
					value: Role.Admin.toString(),
				},
				{
					label: {
						en: 'Customer',
						vi: 'Khách hàng',
					},
					value: Role.SalesManager.toString(),
				},
			],
			access: {
				update: (props) =>
					!(props.req?.user?.role !== Role.Admin || props.doc?.role === Role.Admin),
			},
			label: {
				en: 'Role',
				vi: 'Quyền',
			},
		},
	],
	timestamps: true,
}
