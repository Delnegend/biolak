import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { Lang } from '@/utilities/lang'

export const ArchiveBlockConf: Block = {
	slug: 'archive',
	interfaceName: 'ArchiveBlockProps',
	labels: {
		plural: {
			[Lang.English]: 'Archives',
			[Lang.Vietnamese]: 'Danh sách bài viết',
		},
		singular: {
			[Lang.English]: 'Archive',
			[Lang.Vietnamese]: 'Danh sách bài viết',
		},
	},
	fields: [
		{
			name: 'introContent',
			type: 'richText',
			label: {
				[Lang.English]: 'Intro Content',
				[Lang.Vietnamese]: 'Nội dung giới thiệu',
			},
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					]
				},
			}),
		},
		{
			name: 'populateBy',
			type: 'select',
			label: {
				[Lang.English]: 'Populate By',
				[Lang.Vietnamese]: 'Phân loại',
			},
			defaultValue: 'collection',
			options: [
				{
					label: {
						[Lang.English]: 'Collection',
						[Lang.Vietnamese]: 'Bộ sưu tập',
					},
					value: 'collection',
				},
				{
					label: {
						[Lang.English]: 'Individual Selection',
						[Lang.Vietnamese]: 'Lựa chọn cá nhân',
					},
					value: 'selection',
				},
			],
		},
		{
			name: 'relationTo',
			type: 'select',
			label: {
				[Lang.English]: 'Relation To',
				[Lang.Vietnamese]: 'Liên quan đến',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			defaultValue: 'posts',
			options: [
				{
					label: {
						[Lang.English]: 'Posts',
						[Lang.Vietnamese]: 'Bài viết',
					},
					value: 'posts',
				},
			],
		},
		{
			name: PostCategoriesSlug,
			type: 'relationship',
			label: {
				[Lang.English]: 'Categories',
				[Lang.Vietnamese]: 'Thể loại',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			relationTo: PostCategoriesSlug,
		},
		{
			name: 'limit',
			type: 'number',
			label: {
				[Lang.English]: 'Limit',
				[Lang.Vietnamese]: 'Giới hạn',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
				step: 1,
			},
			defaultValue: 10,
		},
		{
			name: 'selectedDocs',
			type: 'relationship',
			label: {
				[Lang.English]: 'Selected Posts',
				[Lang.Vietnamese]: 'Bài viết đã chọn',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			relationTo: ['posts'],
		},
	],
}
