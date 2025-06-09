import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Tab } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const metaTab: Tab = {
	name: 'meta',
	label: 'SEO',
	fields: [
		{
			name: 'meta',
			type: 'group',
			label: false,
			access: {
				create: allow(Role.Admin, Role.ContentManager),
				read: allow(Role.Public),
				update: allow(Role.Admin, Role.ContentManager),
			},
			fields: [
				OverviewField({
					titlePath: 'title',
					descriptionPath: 'description',
					imagePath: 'image',
				}),
				MetaTitleField({
					hasGenerateFn: true,
					overrides: {
						label: {
							[Lang.English]: 'Meta Title',
							[Lang.Vietnamese]: 'Tiêu đề SEO',
						},
					},
				}),
				MetaImageField({
					relationTo: MediaSlug,
					overrides: {
						label: {
							[Lang.English]: 'Meta Image',
							[Lang.Vietnamese]: 'Hình ảnh SEO',
						},
					},
				}),

				MetaDescriptionField({
					overrides: {
						label: {
							[Lang.English]: 'Meta Description',
							[Lang.Vietnamese]: 'Mô tả SEO',
						},
					},
				}),
				PreviewField({
					// if the `generateUrl` function is configured
					hasGenerateFn: true,

					// field paths to match the target field for data
					titlePath: 'title',
					descriptionPath: 'description',
				}),
			],
		},
	],
} as const
