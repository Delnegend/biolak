import { Field } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const searchFields: Field[] = [
	{
		name: 'slug',
		type: 'text',
		label: {
			en: 'Slug',
			vi: 'Đường dẫn',
		},
		index: true,
		admin: {
			readOnly: true,
		},
	},
	{
		name: 'meta',
		label: 'Meta',
		type: 'group',
		index: true,
		admin: {
			readOnly: true,
		},
		fields: [
			{
				type: 'text',
				name: 'title',
				label: {
					en: 'Title',
					vi: 'Tiêu đề',
				},
			},
			{
				type: 'text',
				name: 'description',
				label: {
					en: 'Description',
					vi: 'Mô tả',
				},
			},
			{
				name: 'image',
				label: {
					en: 'Image',
					vi: 'Hình ảnh',
				},
				type: 'upload',
				relationTo: MediaSlug,
			},
		],
	},
	{
		label: 'Categories',
		name: 'categories',
		type: 'array',
		admin: {
			readOnly: true,
		},
		fields: [
			{
				name: 'relationTo',
				type: 'text',
			},
			{
				name: 'id',
				type: 'text',
			},
			{
				name: 'title',
				type: 'text',
			},
		],
	},
]
