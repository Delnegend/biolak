import { Field } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const searchFields: Field[] = [
	{
		name: 'slug',
		type: 'text',
		label: {
			[Lang.English]: 'Slug',
			[Lang.Vietnamese]: 'Đường dẫn',
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
					[Lang.English]: 'Title',
					[Lang.Vietnamese]: 'Tiêu đề',
				},
			},
			{
				type: 'text',
				name: 'description',
				label: {
					[Lang.English]: 'Description',
					[Lang.Vietnamese]: 'Mô tả',
				},
			},
			{
				name: 'image',
				label: {
					[Lang.English]: 'Image',
					[Lang.Vietnamese]: 'Hình ảnh',
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
