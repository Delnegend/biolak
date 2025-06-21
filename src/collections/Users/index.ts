import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { User } from '@/payload-types'
import { Lang } from '@/utilities/lang'

import { UsersSlug } from './slug'

export const UsersCollection: CollectionConfig<typeof UsersSlug> = {
	slug: UsersSlug,
	labels: {
		singular: {
			[Lang.English]: 'User',
			[Lang.Vietnamese]: 'Người dùng',
		},
		plural: {
			[Lang.English]: 'Users',
			[Lang.Vietnamese]: 'Người dùng',
		},
	},
	access: {
		admin: allow(Role.Admin, Role.ContentManager, Role.SalesManager),
		create: allow(Role.Admin),
		delete: ({ req, data }) => {
			const typedData = data as User

			const fromAdmin = req?.user?.role === Role.Admin
			const toAdmin = typedData.role === Role.Admin
			if (fromAdmin && !toAdmin) return true

			return false
		},
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
				[Lang.English]: 'Name',
				[Lang.Vietnamese]: 'Tên',
			},
		},
		{
			name: 'role',
			type: 'select',
			required: true,
			options: [
				{
					label: {
						[Lang.English]: 'Admin',
						[Lang.Vietnamese]: 'Quản trị viên',
					},
					value: Role.Admin.toString(),
				},
				{
					label: {
						[Lang.English]: 'Sales Manager',
						[Lang.Vietnamese]: 'Quản lý bán hàng',
					},
					value: Role.SalesManager.toString(),
				},
				{
					label: {
						[Lang.English]: 'Content Manager',
						[Lang.Vietnamese]: 'Quản lý nội dung',
					},
					value: Role.ContentManager.toString(),
				},
			],
			access: {
				update: (props) =>
					!(props.req?.user?.role !== Role.Admin || props.doc?.role === Role.Admin),
			},
			label: {
				[Lang.English]: 'Role',
				[Lang.Vietnamese]: 'Quyền',
			},
		},
		{
			name: 'receiveOrderEmail',
			type: 'checkbox',
			defaultValue: true,
			label: {
				[Lang.English]: 'Receive order email notifications',
				[Lang.Vietnamese]: 'Nhận thông báo email đơn hàng',
			},
		},
	],
	timestamps: true,
}
