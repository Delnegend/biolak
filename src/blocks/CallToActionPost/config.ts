import { Block } from 'payload'

import { PostsSlug } from '@/collections/Posts/slug'
import { link } from '@/fields/link'
import { adminLabel } from '@/utilities/adminLabel'

import vi from '../../../messages/vi.json'

export const CallToActionPostBlockConf: Block = {
	slug: 'call-to-action-post',
	labels: {
		singular: adminLabel('admin.blocks.call-to-action-post.label'),
		plural: adminLabel('admin.blocks.call-to-action-post.labelPlural'),
	},
	interfaceName: 'CallToActionPostBlockProps',
	imageURL: '/thumbs/call-to-action-post.avif',
	fields: [
		{
			name: 'post',
			type: 'relationship',
			relationTo: PostsSlug,
			label: adminLabel('admin.blocks.call-to-action-post.fieldPost'),
			required: true,
		},
		{
			name: 'overwriteTitle',
			type: 'text',
			label: adminLabel('admin.blocks.call-to-action-post.fieldOverwriteTitle'),
			localized: true,
		},
		{
			name: 'overwriteDescription',
			type: 'textarea',
			label: adminLabel('admin.blocks.call-to-action-post.fieldOverwriteDescription'),
			localized: true,
		},
		link({
			overrides: {
				required: true,
				localized: true,
			},
			label: {
				placeholder: vi.admin.blocks['call-to-action-post'].placeholderLinkLabel,
				required: false,
			},
		}),
	],
}
