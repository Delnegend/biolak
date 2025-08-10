import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const GeneralGlobalSlug = 'generalGlobal'
export const GeneralGlobalConf: GlobalConfig<typeof GeneralGlobalSlug> = {
	slug: GeneralGlobalSlug,
	label: {
		[Lang.English]: 'General information',
		[Lang.Vietnamese]: 'Thông tin chung',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'description',
			type: 'text',
			localized: true,
			label: {
				[Lang.English]: 'Site description',
				[Lang.Vietnamese]: 'Mô tả trang web',
			},
		},
		{
			name: 'siteBanner',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Site banner',
				[Lang.Vietnamese]: 'Ảnh bìa trang web',
			},
		},
	],
}
