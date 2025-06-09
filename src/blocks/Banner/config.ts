import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { Lang } from '@/utilities/lang'

export const BannerBlockConf: Block = {
	slug: 'banner',
	interfaceName: 'BannerBlockProps',
	labels: {
		plural: {
			[Lang.English]: 'Banners',
			[Lang.Vietnamese]: 'Biểu ngữ',
		},
		singular: {
			[Lang.English]: 'Banner',
			[Lang.Vietnamese]: 'Biểu ngữ',
		},
	},
	fields: [
		{
			name: 'style',
			type: 'select',
			defaultValue: 'info',
			options: [
				{
					label: {
						[Lang.English]: 'Info',
						[Lang.Vietnamese]: 'Thông tin',
					},
					value: 'info',
				},
				{
					label: {
						[Lang.English]: 'Warning',
						[Lang.Vietnamese]: 'Cảnh báo',
					},
					value: 'warning',
				},
				{
					label: {
						[Lang.English]: 'Error',
						[Lang.Vietnamese]: 'Lỗi',
					},
					value: 'error',
				},
				{
					label: {
						[Lang.English]: 'Success',
						[Lang.Vietnamese]: 'Thành công',
					},
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
