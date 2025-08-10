import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

export const ORDERS_tab_review: Field = {
	type: 'group',
	name: 'review',
	label: {
		[Lang.English]: 'Review',
		[Lang.Vietnamese]: 'Đánh giá',
	},
	fields: [
		{
			name: 'rating',
			type: 'number',
			label: {
				[Lang.English]: 'Rating (1-5)',
				[Lang.Vietnamese]: 'Đánh giá (1-5)',
			},
			min: 1,
			max: 5,
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
		{
			name: 'approved',
			type: 'checkbox',
			label: {
				[Lang.English]: 'Approved',
				[Lang.Vietnamese]: 'Đã duyệt',
			},
			access: {
				create: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
			},
			defaultValue: false,
		},
	],
}
