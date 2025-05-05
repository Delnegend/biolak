import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Field } from 'payload'

import { admin } from '@/access/admin'
import { Media } from '@/collections/Media'

export const SeoFieldConf: Field = {
	name: 'meta',
	type: 'group',
	access: {
		create: admin,
		read: () => true,
		update: admin,
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
			relationTo: Media.slug,
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
