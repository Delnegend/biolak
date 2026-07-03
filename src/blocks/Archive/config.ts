import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'

export const ArchiveBlockConf: Block = {
	slug: 'archive',
	interfaceName: 'ArchiveBlockProps',
	labels: {
		plural: 'Archives',
		singular: 'Archive',
	},
	fields: [
		{
			name: 'introContent',
			type: 'richText',
			label: 'Intro Content',
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
			label: 'Populate By',
			defaultValue: 'collection',
			options: [
				{
					label: 'Collection',
					value: 'collection',
				},
				{
					label: 'Selection',
					value: 'selection',
				},
			],
		},
		{
			name: 'relationTo',
			type: 'select',
			label: 'Relation To',
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
			name: PostCategoriesSlug,
			type: 'relationship',
			label: 'Categories',
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			relationTo: PostCategoriesSlug,
		},
		{
			name: 'limit',
			type: 'number',
			label: 'Limit',
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
				step: 1,
			},
			defaultValue: 10,
		},
		{
			name: 'selectedDocs',
			type: 'relationship',
			label: 'Selected Docs',
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			relationTo: ['posts'],
		},
	],
}
