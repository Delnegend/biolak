import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'

export const CallToActionPostBlockConfig: Block = {
	slug: 'call-to-action-post',
	labels: {
		singular: {
			en: 'Call to Action (Post)',
			vi: 'Khối kêu gọi hành động (Bài viết)',
		},
		plural: {
			en: 'Call to Action (Post)',
			vi: 'Khối kêu gọi hành động (Bài viết)',
		},
	},
	interfaceName: 'CallToActionPostBlockProps',
	imageURL: '/thumbs/call-to-action-post.avif',
	fields: [
		{
			name: 'post',
			type: 'relationship',
			relationTo: PostsSlug,
			label: {
				en: 'Post',
				vi: 'Bài viết',
			},
			required: true,
		},
		{
			name: 'overwriteTitle',
			type: 'text',
			label: {
				en: 'Overwrite Title',
				vi: 'Ghi đè tiêu đề',
			},
		},
		{
			name: 'overwriteDescription',
			type: 'textarea',
			label: {
				en: 'Overwrite Description',
				vi: 'Ghi đè mô tả',
			},
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			required: true,
			defaultValue: 'ĐỌC BÀI VIẾT',
		},
	],
}
