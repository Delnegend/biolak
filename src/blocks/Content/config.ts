import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

const columnFields: Field[] = [
	{
		name: 'size',
		type: 'select',
		defaultValue: 'full',
		options: [
			{
				value: 'oneThird',
				label: adminLabel('admin.blocks.content.optionSizeOneThird'),
			},
			{
				value: 'half',
				label: adminLabel('admin.blocks.content.optionSizeHalf'),
			},
			{
				value: 'twoThirds',
				label: adminLabel('admin.blocks.content.optionSizeTwoThirds'),
			},
			{
				value: 'full',
				label: adminLabel('admin.blocks.content.optionSizeFull'),
			},
		],
		label: adminLabel('admin.blocks.content.fieldSize'),
	},
	{
		name: 'font',
		type: 'select',
		defaultValue: 'default',
		label: adminLabel('admin.blocks.content.fieldFont'),
		options: [
			{
				label: adminLabel('admin.blocks.content.optionFontDefault'),
				value: 'default',
			},
			{
				label: adminLabel('admin.blocks.content.optionFontSerif'),
				value: 'serif',
			},
			{
				label: adminLabel('admin.blocks.content.optionFontSansSerif'),
				value: 'sans-serif',
			},
			{
				label: adminLabel('admin.blocks.content.optionFontMonospace'),
				value: 'monospace',
			},
		],
	},
	{
		name: 'customCss',
		type: 'textarea',
		defaultValue: '',
		label: adminLabel('admin.blocks.content.fieldCustomCss'),
	},
	{
		name: 'richText',
		type: 'richText',
		editor: lexicalEditor({
			features: ({ rootFeatures }) => [
				...rootFeatures,
				FixedToolbarFeature(),
				InlineToolbarFeature(),
			],
		}),
		label: false,
	},
	{
		name: 'enableLink',
		type: 'checkbox',
		label: adminLabel('admin.blocks.content.fieldEnableLink'),
	},
	link({
		overrides: {
			admin: {
				condition: (_data, siblingData) => {
					return !!siblingData?.enableLink
				},
			},
		},
	}),
]

export const ContentBlockConf: Block = {
	slug: 'content',
	interfaceName: 'ContentBlockProps',
	labels: {
		singular: adminLabel('admin.blocks.content.label'),
		plural: adminLabel('admin.blocks.content.labelPlural'),
	},
	fields: [
		{
			name: 'columns',
			type: 'array',
			label: adminLabel('admin.blocks.content.fieldColumns'),
			labels: {
				singular: adminLabel('admin.blocks.content.arrayColumnsSingular'),
				plural: adminLabel('admin.blocks.content.arrayColumnsPlural'),
			},
			admin: {
				initCollapsed: true,
			},
			fields: columnFields,
			localized: true,
		},
	],
}
