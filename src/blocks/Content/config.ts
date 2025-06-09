import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

const columnFields: Field[] = [
	{
		name: 'size',
		type: 'select',
		defaultValue: 'full',
		options: [
			{
				value: 'oneThird',
				label: {
					[Lang.English]: 'One Third',
					[Lang.Vietnamese]: 'Một phần ba',
				},
			},
			{
				value: 'half',
				label: {
					[Lang.English]: 'Half',
					[Lang.Vietnamese]: 'Một nửa',
				},
			},
			{
				value: 'twoThirds',
				label: {
					[Lang.English]: 'Two Thirds',
					[Lang.Vietnamese]: 'Hai phần ba',
				},
			},
			{
				value: 'full',
				label: {
					[Lang.English]: 'Full',
					[Lang.Vietnamese]: 'Toàn bộ',
				},
			},
		],
		label: {
			[Lang.English]: 'Size',
			[Lang.Vietnamese]: 'Kích thước',
		},
	},
	{
		name: 'font',
		type: 'select',
		defaultValue: 'default',
		label: {
			[Lang.English]: 'Font',
			[Lang.Vietnamese]: 'Phông chữ',
		},
		options: [
			{
				label: {
					[Lang.English]: 'Default',
					[Lang.Vietnamese]: 'Mặc định',
				},
				value: 'default',
			},
			{
				label: {
					[Lang.English]: 'Serif',
					[Lang.Vietnamese]: 'Serif',
				},
				value: 'serif',
			},
			{
				label: {
					[Lang.English]: 'Sans-serif',
					[Lang.Vietnamese]: 'Sans-serif',
				},
				value: 'sans-serif',
			},
			{
				label: {
					[Lang.English]: 'Monospace',
					[Lang.Vietnamese]: 'Monospace',
				},
				value: 'monospace',
			},
		],
	},
	{
		name: 'customCss',
		type: 'textarea',
		defaultValue: '',
		label: {
			[Lang.English]: 'Custom CSS',
			[Lang.Vietnamese]: 'CSS tùy chỉnh',
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
			[Lang.English]: 'Enable Link',
			[Lang.Vietnamese]: 'Kích hoạt liên kết',
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
			[Lang.English]: 'Content',
			[Lang.Vietnamese]: 'Nội dung',
		},
		plural: {
			[Lang.English]: 'Contents',
			[Lang.Vietnamese]: 'Nội dung',
		},
	},
	fields: [
		{
			name: 'columns',
			type: 'array',
			label: {
				[Lang.English]: 'Columns',
				[Lang.Vietnamese]: 'Cột',
			},
			labels: {
				singular: {
					[Lang.English]: 'Column',
					[Lang.Vietnamese]: 'Cột',
				},
				plural: {
					[Lang.English]: 'Columns',
					[Lang.Vietnamese]: 'Cột',
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
