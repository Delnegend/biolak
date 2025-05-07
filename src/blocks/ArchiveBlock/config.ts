import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { PostCategories } from '@/collections/PostCategories'

export const ArchiveBlockConf: Block = {
	slug: 'archive',
	interfaceName: 'ArchiveBlockProps',
	labels: {
		plural: {
			en: 'Archives',
			vi: 'Danh sách bài viết',
		},
		singular: {
			en: 'Archive',
			vi: 'Danh sách bài viết',
		},
	},
	fields: [
		{
			name: 'introContent',
			type: 'richText',
			label: {
				en: 'Intro Content',
				vi: 'Nội dung giới thiệu',
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
				en: 'Populate By',
				vi: 'Phân loại',
			},
			defaultValue: 'collection',
			options: [
				{
					label: 'Collection',
					value: 'collection',
				},
				{
					label: 'Individual Selection',
					value: 'selection',
				},
			],
		},
		{
			name: 'relationTo',
			type: 'select',
			label: {
				en: 'Relation To',
				vi: 'Liên quan đến',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			defaultValue: 'posts',
			options: [
				{
					label: 'Posts',
					value: 'posts',
				},
			],
		},
		{
			name: PostCategories.slug,
			type: 'relationship',
			label: {
				en: 'Categories',
				vi: 'Thể loại',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			relationTo: PostCategories.slug,
		},
		{
			name: 'limit',
			type: 'number',
			label: {
				en: 'Limit',
				vi: 'Giới hạn',
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
				en: 'Selected Posts',
				vi: 'Bài viết đã chọn',
			},
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			relationTo: ['posts'],
		},
	],
}
