import { Block } from 'payload'

import { Posts } from '@/collections/Posts'

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
					relationTo: Posts.slug as CollectionSlug,
					required: true,
					hasMany: false,
				},
			],
		},
	],
}
