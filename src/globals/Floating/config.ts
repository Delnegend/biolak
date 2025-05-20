import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'

export const FloatingGlobalSlug = 'floatingGlobal'
export const FloatingGlobalConf: GlobalConfig<typeof FloatingGlobalSlug> = {
	slug: FloatingGlobalSlug,
	label: {
		en: 'Floating buttons',
		vi: 'Nút nổi',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'label',
			type: 'text',
			label: {
				en: 'Label',
				vi: 'Nhãn',
			},
			required: true,
			defaultValue: 'Liên hệ',
		},
		{
			name: 'links',
			type: 'array',
			label: {
				en: 'Links',
				vi: 'Liên kết',
			},
			labels: {
				singular: {
					en: 'Link',
					vi: 'Liên kết',
				},
				plural: {
					en: 'Links',
					vi: 'Liên kết',
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
								en: 'Link',
								vi: 'Liên kết',
							},
							required: true,
						},
						{
							name: 'icon',
							type: 'relationship',
							relationTo: MediaSlug,
							label: {
								en: 'Icon',
								vi: 'Biểu tượng',
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
