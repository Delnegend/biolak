import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { ContactFormSubmissionsSlug } from './slug'

export const ContactFormSubmissionsCollection: CollectionConfig<typeof ContactFormSubmissionsSlug> =
	{
		slug: ContactFormSubmissionsSlug,
		labels: {
			singular: {
				[Lang.English]: 'Contact Form Submission',
				[Lang.Vietnamese]: 'Đơn điền liên hệ',
			},
			plural: {
				[Lang.English]: 'Contact Forms Submissions',
				[Lang.Vietnamese]: 'Đơn điền liên hệ',
			},
		},
		access: {
			create: allow(Role.Public),
			read: allow(Role.Admin),
			update: allow(Role.NoOne),
			delete: allow(Role.Admin),
		},
		fields: [
			{
				name: 'username',
				type: 'text',
				required: true,
				label: {
					[Lang.English]: 'Username',
					[Lang.Vietnamese]: 'Tên người dùng',
				},
			},
			{
				name: 'email',
				type: 'text',
				label: {
					[Lang.English]: 'Email',
					[Lang.Vietnamese]: 'Email',
				},
			},
			{
				name: 'phoneNumber',
				type: 'text',
				required: true,
				label: {
					[Lang.English]: 'Phone Number',
					[Lang.Vietnamese]: 'Số điện thoại',
				},
			},
			{
				name: 'message',
				type: 'textarea',
				required: true,
				label: {
					[Lang.English]: 'Message',
					[Lang.Vietnamese]: 'Tin nhắn',
				},
			},
		],
	}
