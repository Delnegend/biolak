import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { CallToActionPostBlockDefaults as defaults } from './defaults'

export const CallToActionPostBlockConf: Block = {
	slug: 'call-to-action-post',
	labels: {
		singular: {
			[Lang.English]: 'Call to Action (Post)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Bài viết)',
		},
		plural: {
			[Lang.English]: 'Call to Action (Post)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Bài viết)',
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
				[Lang.English]: 'Post',
				[Lang.Vietnamese]: 'Bài viết',
			},
			required: true,
		},
		{
			name: 'overwriteTitle',
			type: 'text',
			label: {
				[Lang.English]: 'Overwrite Title',
				[Lang.Vietnamese]: 'Ghi đè tiêu đề',
			},
			localized: true,
		},
		{
			name: 'overwriteDescription',
			type: 'textarea',
			label: {
				[Lang.English]: 'Overwrite Description',
				[Lang.Vietnamese]: 'Ghi đè mô tả',
			},
			localized: true,
		},
		link({
			overrides: {
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
