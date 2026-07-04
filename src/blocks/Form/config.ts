import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { adminLabel } from '@/utilities/adminLabel'

export const FormBlockConf: Block = {
	slug: 'formBlock',
	interfaceName: 'FormBlockProps',
	fields: [
		{
			name: 'form',
			type: 'relationship',
			relationTo: 'forms',
			required: true,
		},
		{
			name: 'enableIntro',
			type: 'checkbox',
			label: adminLabel('admin.blocks.formBlock.fieldEnableIntro'),
		},
		{
			name: 'introContent',
			type: 'richText',
			admin: {
				condition: (_, { enableIntro }) => !!enableIntro,
			},
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					]
				},
			}),
			label: adminLabel('admin.blocks.formBlock.fieldIntroContent'),
		},
	],
	graphQL: {
		singularName: 'FormBlock',
	},
	labels: {
		plural: adminLabel('admin.blocks.formBlock.labelPlural'),
		singular: adminLabel('admin.blocks.formBlock.label'),
	},
}
