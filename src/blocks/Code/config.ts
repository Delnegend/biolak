import type { Block } from 'payload'

import { adminLabel } from '@/utilities/adminLabel'

export const Code: Block = {
	slug: 'code',
	interfaceName: 'CodeBlockProps',
	fields: [
		{
			name: 'language',
			type: 'select',
			defaultValue: 'typescript',
			options: [
				{
					label: adminLabel('admin.blocks.code.optionLanguageTypescript'),
					value: 'typescript',
				},
				{
					label: adminLabel('admin.blocks.code.optionLanguageJavascript'),
					value: 'javascript',
				},
				{
					label: adminLabel('admin.blocks.code.optionLanguageCss'),
					value: 'css',
				},
			],
		},
		{
			name: 'code',
			type: 'code',
			label: false,
			required: true,
		},
	],
}
