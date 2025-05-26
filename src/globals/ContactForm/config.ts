import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ContactFormGlobalSlug = 'contactFormGlobal'
export const ContactFormGlobalConf: GlobalConfig<typeof ContactFormGlobalSlug> = {
	slug: ContactFormGlobalSlug,
	label: {
		en: 'Contact Form',
		vi: 'Mẫu liên hệ',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Contact Us',
				[Lang.Vietnamese]: 'Liên hệ với BioLAK',
			}),
		},
		{
			name: 'name',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Input your name',
				[Lang.Vietnamese]: 'Nhập tên của bạn',
			}),
		},
		{
			name: 'phoneNumber',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Input your phone number',
				[Lang.Vietnamese]: 'Nhập số điện thoại',
			}),
		},
		{
			name: 'email',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Input your email',
				[Lang.Vietnamese]: 'Nhập địa chỉ email',
			}),
		},
		{
			name: 'question',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Ask your question to us',
				[Lang.Vietnamese]: 'Câu hỏi của bạn tới chúng tôi',
			}),
		},
		{
			name: 'actionSend',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'SEND BIOLAK',
				[Lang.Vietnamese]: 'GỬI BIOLAK',
			}),
		},
		{
			name: 'biolakPhoneNumber',
			type: 'text',
			defaultValue: '0987654321',
		},
		{
			name: 'actionCall',
			type: 'text',
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'CALL BIOLAK',
				[Lang.Vietnamese]: 'GỌI BIOLAK',
			}),
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating contact form`)

					revalidateTag(ContactFormGlobalSlug)
				}

				return doc
			},
		],
	},
}
