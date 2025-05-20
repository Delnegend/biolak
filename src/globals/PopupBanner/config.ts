import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'

export const PopupBannerGlobalSlug = 'popupBannerGlobal'
export const PopupBannerGlobalConf: GlobalConfig<typeof PopupBannerGlobalSlug> = {
	slug: PopupBannerGlobalSlug,
	label: {
		en: 'Popup Banner',
		vi: 'Ảnh bìa hiện bật',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating popup banner`)

					revalidateTag(PopupBannerGlobalSlug)
				}

				return doc
			},
		],
	},
}
