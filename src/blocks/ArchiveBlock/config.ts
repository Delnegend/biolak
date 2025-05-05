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
			label: 'Intro Content',
		},
		{
			name: 'populateBy',
			type: 'select',
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
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			defaultValue: 'posts',
			label: 'Collections To Show',
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
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			label: 'Categories To Show',
			relationTo: PostCategories.slug as CollectionSlug,
		},
		{
			name: 'limit',
			type: 'number',
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
				step: 1,
			},
			defaultValue: 10,
			label: 'Limit',
		},
		{
			name: 'selectedDocs',
			type: 'relationship',
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			label: 'Selection',
			relationTo: ['posts'],
		},
	],
}
