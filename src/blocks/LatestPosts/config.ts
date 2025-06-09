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
			[Lang.English]: 'Latest Posts',
			[Lang.Vietnamese]: 'Bài viết mới nhất',
		},
		plural: {
			[Lang.English]: 'Latest Posts',
			[Lang.Vietnamese]: 'Bài viết mới nhất',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
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
				[Lang.English]: 'Button Label',
				[Lang.Vietnamese]: 'Nhãn nút',
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
				[Lang.English]: 'Posts',
				[Lang.Vietnamese]: 'Bài viết',
			},
			type: 'relationship',
			relationTo: PostsSlug,
			required: true,
			hasMany: true,
		},
	],
}
