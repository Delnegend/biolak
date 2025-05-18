import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'

import { ContactFormSubmissionsSlug } from './slug'

export const ContactFormSubmissionsCollection: CollectionConfig<typeof ContactFormSubmissionsSlug> =
	{
		slug: ContactFormSubmissionsSlug,
		labels: {
			singular: {
				en: 'Contact Form Submission',
				vi: 'Đơn điền liên hệ',
			},
			plural: {
				en: 'Contact Forms Submissions',
				vi: 'Đơn điền liên hệ',
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
					en: 'Username',
					vi: 'Tên người dùng',
				},
			},
			{
				name: 'email',
				type: 'text',
				required: true,
				label: {
					en: 'Email',
					vi: 'Email',
				},
			},
			{
				name: 'phoneNumber',
				type: 'text',
				required: true,
				label: {
					en: 'Phone Number',
					vi: 'Số điện thoại',
				},
			},
			{
				name: 'message',
				type: 'textarea',
				required: true,
				label: {
					en: 'Message',
					vi: 'Tin nhắn',
				},
			},
		],
	}
