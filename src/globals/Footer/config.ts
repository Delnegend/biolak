import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/i18n/routing'

import vi from '../../../messages/vi.json'

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
							admin: {
								placeholder: vi.globals.footer.contactUs.title,
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.footer.contactUs.emailInputLabel,
							},
						},
						{
							name: 'description',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.footer.contactUs.description,
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
							admin: {
								placeholder: vi.globals.footer.legal.title,
							},
						},
						{
							name: 'content',
							type: 'textarea',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.footer.legal.content,
							},
						},
						{
							name: 'copyright',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.footer.legal.copyright,
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

					revalidateTag(FooterGlobalSlug, 'default')
				}

				return doc
			},
		],
	},
}
