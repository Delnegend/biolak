import { type GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { link } from '@/fields/link'

import { revalidatePromo } from './hooks/revalidatePromo'

export const PromoGlobalConf: GlobalConfig = {
	slug: 'promo',
	label: {
		en: 'Promo message',
		vi: 'Thông điệp khuyến mãi',
	},
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
