import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { localize } from '@/translations/components/blocks'

export const ArchiveBlockConf: Block = {
	slug: 'archive',
	interfaceName: 'ArchiveBlockProps',
	labels: {
		plural: localize((t) => t.archive.label.plural),
		singular: localize((t) => t.archive.label.singular),
	},
	fields: [
		{
			name: 'introContent',
			type: 'richText',
			label: localize((t) => t.archive.labels.introContent),
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
			label: localize((t) => t.archive.labels.populateBy),
			defaultValue: 'collection',
			options: [
				{
					label: localize((t) => t.archive.labels.populateByOptions.collection),
					value: 'collection',
				},
				{
					label: localize((t) => t.archive.labels.populateByOptions.selection),
					value: 'selection',
				},
			],
		},
		{
			name: 'relationTo',
			type: 'select',
			label: localize((t) => t.archive.labels.relationTo),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			defaultValue: 'posts',
			options: [
				{
					label: localize((t) => t.archive.labels.relationToOptions.posts),
					value: 'posts',
				},
			],
		},
		{
			name: PostCategoriesSlug,
			type: 'relationship',
			label: localize((t) => t.archive.labels.categories),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			relationTo: PostCategoriesSlug,
		},
		{
			name: 'limit',
			type: 'number',
			label: localize((t) => t.archive.labels.limit),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
				step: 1,
			},
			defaultValue: 10,
		},
		{
			name: 'selectedDocs',
			type: 'relationship',
			label: localize((t) => t.archive.labels.selectedDocs),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			relationTo: ['posts'],
		},
	],
}
