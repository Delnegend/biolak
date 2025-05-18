import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'

export const PopupBannerGlobalSlug = 'popup-banner'
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
}
