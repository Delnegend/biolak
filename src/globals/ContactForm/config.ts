import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/i18n/routing'

import vi from '../../../messages/vi.json'

export const ContactFormGlobalSlug = 'contactFormGlobal'
export const ContactFormGlobalConf: GlobalConfig<typeof ContactFormGlobalSlug> = {
	slug: ContactFormGlobalSlug,
	label: {
		[Lang.English]: 'Contact Form',
		[Lang.Vietnamese]: 'Mẫu liên hệ',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			localized: true,
			label: false,
			admin: {
				placeholder: vi.globals.contactForm.title,
			},
		},
		{
			name: 'name',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.name,
			},
		},
		{
			name: 'phoneNumber',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.phoneNumber,
			},
		},
		{
			name: 'email',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.email,
			},
		},
		{
			name: 'question',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.question,
			},
		},
		{
			name: 'actionSend',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.actionSend,
			},
		},
		{
			name: 'biolakPhoneNumber',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.biolakPhoneNumber,
			},
		},
		{
			name: 'actionCall',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.contactForm.actionCall,
			},
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating contact form`)

					revalidateTag(ContactFormGlobalSlug, 'default')
				}

				return doc
			},
		],
	},
}
