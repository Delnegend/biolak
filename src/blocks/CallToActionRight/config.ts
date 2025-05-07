import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'

export const CallToActionRightBlockConf: Block = {
	slug: 'cta-right',
	interfaceName: 'CallToActionRightBlockProps',
	imageURL: '/thumbs/call-to-action-right.avif',
	labels: {
		plural: {
			en: 'Call to Action (Right)',
			vi: 'Kêu gọi hành động (Phải)',
		},
		singular: {
			en: 'Call to Action (Right)',
			vi: 'Kêu gọi hành động (Phải)',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: {
				en: 'Sub Title',
				vi: 'Tiêu đề phụ',
			},
		},
		{
			name: 'description',
			type: 'richText',
			label: {
				en: 'Description',
				vi: 'Mô tả',
			},
		},
		{
			name: 'gallery',
			type: 'array',
			label: {
				en: 'Gallery',
				vi: 'Thư viện',
			},
			labels: {
				singular: {
					en: 'Image',
					vi: 'Hình ảnh',
				},
				plural: {
					en: 'Images',
					vi: 'Hình ảnh',
				},
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: {
						en: 'Image Title',
						vi: 'Tiêu đề hình ảnh',
					},
					required: true,
				},
				{
					name: 'image',
					type: 'upload',
					label: {
						en: 'Image',
						vi: 'Hình ảnh',
					},
					relationTo: MediaSlug,
				},
			],
		},
		{
			name: 'button',
			type: 'group',
			label: {
				en: 'Button',
				vi: 'Nút',
			},
			fields: [
				{
					name: 'text',
					type: 'text',
					label: {
						en: 'Button Label',
						vi: 'Nhãn nút',
					},
					required: true,
				},
				link({ appearances: false, disableLabel: true }),
			],
		},
	],
}
