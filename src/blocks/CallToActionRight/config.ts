import type { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { CallToActionRightBlockDefaults as defaults } from './defaults'

export const CallToActionRightBlockConf: Block = {
	slug: 'cta-right',
	interfaceName: 'CallToActionRightBlockProps',
	imageURL: '/thumbs/call-to-action-right.avif',
	labels: {
		plural: {
			[Lang.English]: 'Call to Action (Right)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Phải)',
		},
		singular: {
			[Lang.English]: 'Call to Action (Right)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Phải)',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'textarea',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			required: true,
			localized: true,
		},
		{
			name: 'sub-title',
			type: 'textarea',
			label: {
				[Lang.English]: 'Sub Title',
				[Lang.Vietnamese]: 'Tiêu đề phụ',
			},
			localized: true,
		},
		{
			name: 'description',
			type: 'richText',
			label: {
				[Lang.English]: 'Description',
				[Lang.Vietnamese]: 'Mô tả',
			},
			localized: true,
		},
		{
			name: 'gallery',
			type: 'array',
			label: {
				[Lang.English]: 'Gallery',
				[Lang.Vietnamese]: 'Thư viện',
			},
			labels: {
				singular: {
					[Lang.English]: 'Image',
					[Lang.Vietnamese]: 'Hình ảnh',
				},
				plural: {
					[Lang.English]: 'Images',
					[Lang.Vietnamese]: 'Hình ảnh',
				},
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: {
						[Lang.English]: 'Image Title',
						[Lang.Vietnamese]: 'Tiêu đề hình ảnh',
					},
					required: true,
					localized: true,
				},
				{
					name: 'image',
					type: 'upload',
					label: {
						[Lang.English]: 'Image',
						[Lang.Vietnamese]: 'Hình ảnh',
					},
					relationTo: MediaSlug,
				},
			],
		},
		link({
			overrides: {
				defaultValue: defaults.buttonLabel,
				required: true,
				localized: true,
			},
			label: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
				required: false,
			},
		}),
	],
}
