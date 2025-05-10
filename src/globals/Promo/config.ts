import { type GlobalConfig } from 'payload'

import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { link } from '@/fields/link'

import { revalidatePromo } from './hooks/revalidatePromo'

export const PromoGlobalConf: GlobalConfig = {
	slug: 'promo',
	access: {
		read: anyone,
		update: admin,
	},
	fields: [
		{
			name: 'message',
			type: 'text',
			defaultValue: '',
		},
		link({ appearances: false }),
	],
	hooks: {
		afterChange: [revalidatePromo],
	},
}
