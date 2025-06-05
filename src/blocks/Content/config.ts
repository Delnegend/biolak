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
				value: 'oneThird',
				label: {
					en: 'One Third',
					vi: 'Một phần ba',
				},
			},
			{
				value: 'half',
				label: {
					en: 'Half',
					vi: 'Một nửa',
				},
			},
			{
				value: 'twoThirds',
				label: {
					en: 'Two Thirds',
					vi: 'Hai phần ba',
				},
			},
			{
				value: 'full',
				label: {
					en: 'Full',
					vi: 'Toàn bộ',
				},
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
		label: {
			en: 'Font',
			vi: 'Phông chữ',
		},
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
		singular: {
			en: 'Content',
			vi: 'Nội dung',
		},
		plural: {
			en: 'Contents',
			vi: 'Nội dung',
		},
	},
	fields: [
		{
			name: 'columns',
			type: 'array',
			label: {
				en: 'Columns',
				vi: 'Cột',
			},
			labels: {
				singular: {
					en: 'Column',
					vi: 'Cột',
				},
				plural: {
					en: 'Columns',
					vi: 'Cột',
				},
			},
			admin: {
				initCollapsed: true,
			},
			fields: columnFields,
			localized: true,
		},
	],
}
