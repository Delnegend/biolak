import { revalidateTag } from 'next/cache'
import { type GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

export const PromoGlobalSlug = 'promoGlobal'
export const PromoGlobalConf: GlobalConfig<typeof PromoGlobalSlug> = {
	slug: PromoGlobalSlug,
	label: {
		[Lang.English]: 'Promo message',
		[Lang.Vietnamese]: 'Thông điệp khuyến mãi',
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
