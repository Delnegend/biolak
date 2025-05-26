import { revalidateTag } from 'next/cache'
import { type GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { link } from '@/fields/link'

export const PromoGlobalSlug = 'promoGlobal'
export const PromoGlobalConf: GlobalConfig<typeof PromoGlobalSlug> = {
	slug: PromoGlobalSlug,
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
			localized: true,
		},
		link(),
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating promo`)

					revalidateTag(PromoGlobalSlug)
				}

				return doc
			},
		],
	},
}
