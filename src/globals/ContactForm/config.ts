import { GlobalConfig } from 'payload'

import { admin } from '@/access/admin'

import { revalidateContactForm } from './hooks/revalidateContactForm'

export const ContactFormGlobalSlug = 'contactFormGlobal'
export const ContactFormGlobalConf: GlobalConfig<typeof ContactFormGlobalSlug> = {
	slug: ContactFormGlobalSlug,
	label: {
		en: 'Contact Form',
		vi: 'Mẫu liên hệ',
	},
	access: {
		read: () => true,
		update: admin,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			defaultValue: 'Liên hệ với BioLAK',
			required: true,
		},
		{
			name: 'name',
			type: 'text',
			defaultValue: 'Nhập tên của bạn',
			required: true,
		},
		{
			name: 'phoneNumber',
			type: 'text',
			defaultValue: 'Nhập số điện thoại',
			required: true,
		},
		{
			name: 'email',
			type: 'text',
			defaultValue: 'Nhập địa chỉ email',
			required: true,
		},
		{
			name: 'question',
			type: 'text',
			defaultValue: 'Câu hỏi của bạn tới chúng tôi',
			required: true,
		},
		{
			name: 'actionSend',
			type: 'text',
			defaultValue: 'GỬI BIOLAK',
			required: true,
		},
		{
			name: 'biolakPhoneNumber',
			type: 'text',
			defaultValue: '0987654321',
		},
		{
			name: 'actionCall',
			type: 'text',
			defaultValue: 'GỌI BIOLAK',
			required: true,
		},
	],
	hooks: {
		afterChange: [revalidateContactForm],
	},
}
