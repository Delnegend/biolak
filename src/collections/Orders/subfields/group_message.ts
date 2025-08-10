import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

export const ORDERS_group_message: Field = {
	type: 'group',
	name: 'message',
	label: {
		[Lang.English]: 'Message',
		[Lang.Vietnamese]: 'Lời nhắn',
	},
	fields: [
		{
			name: 'sender',
			type: 'text',
			label: {
				[Lang.English]: 'Sender',
				[Lang.Vietnamese]: 'Người gửi',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
		},
		{
			name: 'receiver',
			type: 'textarea',
			label: {
				[Lang.English]: 'Receiver',
				[Lang.Vietnamese]: 'Người nhận',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
		},
		{
			name: 'content',
			type: 'textarea',
			label: {
				[Lang.English]: 'Content',
				[Lang.Vietnamese]: 'Nội dung',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
		},
	],
}
