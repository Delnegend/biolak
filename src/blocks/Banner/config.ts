import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { adminLabel } from '@/utilities/adminLabel'

export const BannerBlockConf: Block = {
	slug: 'banner',
	interfaceName: 'BannerBlockProps',
	labels: {
		plural: adminLabel('admin.blocks.banner.labelPlural'),
		singular: adminLabel('admin.blocks.banner.label'),
	},
	fields: [
		{
			name: 'style',
			type: 'select',
			defaultValue: 'info',
			options: [
				{
					label: adminLabel('admin.blocks.banner.optionStyleInfo'),
					value: 'info',
				},
				{
					label: adminLabel('admin.blocks.banner.optionStyleWarning'),
					value: 'warning',
				},
				{
					label: adminLabel('admin.blocks.banner.optionStyleError'),
					value: 'error',
				},
				{
					label: adminLabel('admin.blocks.banner.optionStyleSuccess'),
					value: 'success',
				},
			],
			required: true,
		},
		{
			name: 'content',
			type: 'richText',
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
				},
			}),
			label: false,
			required: true,
		},
	],
}
