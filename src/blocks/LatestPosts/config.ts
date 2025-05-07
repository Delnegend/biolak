import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'

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
			defaultValue: 'Bài viết mới nhất',
			required: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			defaultValue: 'TẤT CẢ BÀI VIẾT',
			required: true,
		},
		{
			name: 'posts',
			type: 'array',
			fields: [
				{
					name: 'post',
					type: 'relationship',
					relationTo: PostsSlug,
					required: true,
					hasMany: false,
				},
			],
		},
	],
}
