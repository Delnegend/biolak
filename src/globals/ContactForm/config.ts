import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { ContactFormGlobalDefaults as defaults } from './defaults'

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
			localized: true,
			label: false,
			defaultValue: defaults.title,
			admin: {
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'name',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.name,
			admin: {
				placeholder: defaults.name(Lang.Vietnamese),
			},
		},
		{
			name: 'phoneNumber',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.phoneNumber,
			admin: {
				placeholder: defaults.phoneNumber(Lang.Vietnamese),
			},
		},
		{
			name: 'email',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.email,
			admin: {
				placeholder: defaults.email(Lang.Vietnamese),
			},
		},
		{
			name: 'question',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.question,
			admin: {
				placeholder: defaults.question(Lang.Vietnamese),
			},
		},
		{
			name: 'actionSend',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.actionSend,
			admin: {
				placeholder: defaults.actionSend(Lang.Vietnamese),
			},
		},
		{
			name: 'biolakPhoneNumber',
			type: 'text',
			label: false,
			defaultValue: defaults.biolakPhoneNumber,
			localized: true,
			admin: {
				placeholder: defaults.biolakPhoneNumber(Lang.Vietnamese),
			},
		},
		{
			name: 'actionCall',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.actionCall,
			admin: {
				placeholder: defaults.actionCall(Lang.Vietnamese),
			},
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
