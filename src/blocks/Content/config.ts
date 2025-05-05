import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'

const columnFields: Field[] = [
	{
		name: 'size',
		type: 'select',
		defaultValue: 'full',
		options: [
			{
				label: 'One Third',
				value: 'oneThird',
			},
			{
				label: 'Half',
				value: 'half',
			},
			{
				label: 'Two Thirds',
				value: 'twoThirds',
			},
			{
				label: 'Full',
				value: 'full',
			},
		],
		label: {
			en: 'Size',
			vi: 'Kích thước',
		},
	},
	{
		name: 'font',
		type: 'select',
		defaultValue: 'default',
		options: [
			{
				label: 'Default',
				value: 'default',
			},
			{
				label: 'Serif',
				value: 'serif',
			},
			{
				label: 'Sans-serif',
				value: 'sans-serif',
			},
			{
				label: 'Monospace',
				value: 'monospace',
			},
		],
		label: {
			en: 'Font',
			vi: 'Phông chữ',
		},
	},
	{
		name: 'customCss',
		type: 'textarea',
		defaultValue: '',
		label: {
			en: 'Custom CSS',
			vi: 'CSS tùy chỉnh',
		},
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
		label: {
			en: 'Enable Link',
			vi: 'Kích hoạt liên kết',
		},
	},
	link({
		overrides: {
			admin: {
				condition: (_data, siblingData) => {
					return Boolean(siblingData?.enableLink)
				},
			},
		},
	}),
]

export const ContentBlockConf: Block = {
	slug: 'content',
	interfaceName: 'ContentBlockProps',
	fields: [
		{
			name: 'columns',
			type: 'array',
			admin: {
				initCollapsed: true,
			},
			fields: columnFields,
		},
	],
}
