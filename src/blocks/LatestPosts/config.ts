import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { Lang } from '@/i18n/routing'

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
			admin: {
				placeholder: 'Bài viết mới nhất',
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
			admin: {
				placeholder: 'TẤT CẢ BÀI VIẾT',
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
