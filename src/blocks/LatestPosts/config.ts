import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { Lang } from '@/utilities/lang'

import { LatestPostsBlockDefaults as defaults } from './defaults'

export const LatestPostsBlockConf: Block = {
	slug: 'latestPosts',
	interfaceName: 'LatestPostsBlockProps',
	imageURL: '/thumbs/latest-posts.avif',
	labels: {
		singular: {
			en: 'Latest Posts',
			vi: 'Bài viết mới nhất',
		},
		plural: {
			en: 'Latest Posts',
			vi: 'Bài viết mới nhất',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			localized: true,
			defaultValue: defaults.title,
			admin: {
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			localized: true,
			defaultValue: defaults.buttonLabel,
			admin: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
			},
		},
		{
			name: 'posts',
			label: {
				en: 'Posts',
				vi: 'Bài viết',
			},
			type: 'relationship',
			relationTo: PostsSlug,
			required: true,
			hasMany: true,
		},
	],
}
