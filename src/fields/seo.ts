import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'

export const SeoFieldConf: Field = {
	name: 'meta',
	type: 'group',
	access: {
		create: allow(Role.Admin, Role.ContentManager),
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		OverviewField({
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
			imagePath: 'meta.image',
		}),
		MetaTitleField({
			hasGenerateFn: true,
		}),
		MetaImageField({
			relationTo: MediaSlug,
		}),

		MetaDescriptionField({}),
		PreviewField({
			// if the `generateUrl` function is configured
			hasGenerateFn: true,

			// field paths to match the target field for data
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
		}),
	],
}
