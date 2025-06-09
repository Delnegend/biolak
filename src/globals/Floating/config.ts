import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

import { FloatingGlobalDefaults as defaults } from './defaults'

export const FloatingGlobalSlug = 'floatingGlobal'
export const FloatingGlobalConf: GlobalConfig<typeof FloatingGlobalSlug> = {
	slug: FloatingGlobalSlug,
	label: {
		[Lang.English]: 'Floating Contacts Buttons',
		[Lang.Vietnamese]: 'Nút nổi liên hệ',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'label',
			type: 'text',
			label: false,
			localized: true,
			defaultValue: defaults.contact,
			admin: {
				placeholder: defaults.contact(Lang.Vietnamese),
			},
		},
		{
			name: 'links',
			type: 'array',
			label: {
				[Lang.English]: 'Links',
				[Lang.Vietnamese]: 'Liên kết',
			},
			labels: {
				singular: {
					[Lang.English]: 'Link',
					[Lang.Vietnamese]: 'Liên kết',
				},
				plural: {
					[Lang.English]: 'Links',
					[Lang.Vietnamese]: 'Liên kết',
				},
			},
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'link',
							type: 'text',
							label: {
								[Lang.English]: 'Link',
								[Lang.Vietnamese]: 'Liên kết',
							},
							required: true,
						},
						{
							name: 'icon',
							type: 'relationship',
							relationTo: MediaSlug,
							label: {
								[Lang.English]: 'Icon',
								[Lang.Vietnamese]: 'Biểu tượng',
							},
						},
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating floating`)

					revalidateTag(FloatingGlobalSlug)
				}

				return doc
			},
		],
	},
}
