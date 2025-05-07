import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const BannerBlockConf: Block = {
	slug: 'banner',
	interfaceName: 'BannerBlockProps',
	labels: {
		plural: {
			en: 'Banners',
			vi: 'Biểu ngữ',
		},
		singular: {
			en: 'Banner',
			vi: 'Biểu ngữ',
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
						en: 'Info',
						vi: 'Thông tin',
					},
					value: 'info',
				},
				{
					label: {
						en: 'Warning',
						vi: 'Cảnh báo',
					},
					value: 'warning',
				},
				{
					label: {
						en: 'Error',
						vi: 'Lỗi',
					},
					value: 'error',
				},
				{
					label: {
						en: 'Success',
						vi: 'Thành công',
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
