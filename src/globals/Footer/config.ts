import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

import { FooterGlobalDefaults as defaults } from './defaults'

export const FooterGlobalSlug = 'footerGlobal'
export const FooterGlobalConf: GlobalConfig<typeof FooterGlobalSlug> = {
	slug: FooterGlobalSlug,
	label: {
		[Lang.English]: 'Footer',
		[Lang.Vietnamese]: 'Chân trang',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					name: 'image',
					label: 'Image',
					fields: [
						{
							name: 'image',
							type: 'upload',
							relationTo: MediaSlug,
							label: {
								[Lang.English]: 'Background Image',
								[Lang.Vietnamese]: 'Hình ảnh nền',
							},
						},
					],
				},
				{
					name: 'contactUs',
					label: {
						[Lang.English]: 'Contact Us',
						[Lang.Vietnamese]: 'Liên hệ với chúng tôi',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.contactUs.title,
							admin: {
								placeholder: defaults.contactUs.title(Lang.Vietnamese),
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.contactUs.emailInputLabel,
							admin: {
								placeholder: defaults.contactUs.emailInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'description',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.contactUs.description,
							admin: {
								placeholder: defaults.contactUs.description(Lang.Vietnamese),
							},
						},
					],
				},
				{
					name: 'legal',
					label: 'Legal',
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.legal.title,
							admin: {
								placeholder: defaults.legal.title(Lang.Vietnamese),
							},
						},
						{
							name: 'content',
							type: 'textarea',
							label: false,
							localized: true,
							defaultValue: defaults.legal.content,
							admin: {
								placeholder: defaults.legal.content(Lang.Vietnamese),
							},
						},
						{
							name: 'stamp',
							type: 'upload',
							relationTo: MediaSlug,
							label: {
								[Lang.English]: 'Stamp',
								[Lang.Vietnamese]: 'Dấu',
							},
						},
						{
							name: 'copyright',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.legal.copyright,
							admin: {
								placeholder: defaults.legal.copyright(Lang.Vietnamese),
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
					payload.logger.info(`Revalidating footer`)

					revalidateTag(FooterGlobalSlug)
				}

				return doc
			},
		],
	},
}
