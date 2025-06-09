import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

export const PopupBannerGlobalSlug = 'popupBannerGlobal'
export const PopupBannerGlobalConf: GlobalConfig<typeof PopupBannerGlobalSlug> = {
	slug: PopupBannerGlobalSlug,
	label: {
		[Lang.English]: 'Popup Banner',
		[Lang.Vietnamese]: 'Ảnh bìa hiện bật',
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
