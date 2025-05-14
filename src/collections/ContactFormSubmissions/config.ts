import { CollectionConfig } from 'payload'

import { admin } from '@/access/admin'

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
			create: () => true,
			read: admin,
			update: () => false,
			delete: admin,
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
