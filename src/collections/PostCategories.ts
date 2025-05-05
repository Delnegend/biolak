import { slugField } from '@/fields/slug'
import { CollectionConf } from '@/utilities/types'

import { admin } from '../access/admin'
import { anyone } from '../access/anyone'

export const PostCategories: CollectionConfig = {
	slug: 'postCategories',
	labels: {
		singular: {
			en: 'Post Category',
			vi: 'Danh mục bài viết',
		},
		plural: {
			en: 'Post Categories',
			vi: 'Danh mục bài viết',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: anyone,
		update: admin,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
		},
		...slugField(),
	],
}
