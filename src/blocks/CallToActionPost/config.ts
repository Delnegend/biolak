import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { CallToActionPostBlockDefaults as defaults } from './defaults'

export const CallToActionPostBlockConf: Block = {
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
			localized: true,
		},
		{
			name: 'overwriteDescription',
			type: 'textarea',
			label: {
				en: 'Overwrite Description',
				vi: 'Ghi đè mô tả',
			},
			localized: true,
		},
		link({
			overrides: {
				label: {
					en: 'Button Label',
					vi: 'Nhãn nút',
				},
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
