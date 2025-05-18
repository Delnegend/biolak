import { type GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { allow, Role } from '@/access/allow'
import { revalidatePromo } from './hooks/revalidatePromo'

export const PromoGlobalConf: GlobalConfig = {
	slug: 'promo',
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'message',
			type: 'text',
			defaultValue: '',
		},
		link(),
	],
	hooks: {
		afterChange: [revalidatePromo],
	},
}
