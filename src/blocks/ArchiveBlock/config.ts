import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const ArchiveBlockConf: Block = {
	slug: 'archive',
	interfaceName: 'ArchiveBlockProps',
	labels: {
		plural: adminLabel('admin.blocks.archive.labelPlural'),
		singular: adminLabel('admin.blocks.archive.label'),
	},
	fields: [
		{
			name: 'introContent',
			type: 'richText',
			label: adminLabel('admin.blocks.archive.fieldIntroContent'),
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
			label: adminLabel('admin.blocks.archive.fieldPopulateBy'),
			defaultValue: 'collection',
			options: [
				{
					label: adminLabel('admin.blocks.archive.optionPopulateByCollection'),
					value: 'collection',
				},
				{
					label: adminLabel('admin.blocks.archive.optionPopulateBySelection'),
					value: 'selection',
				},
			],
		},
		{
			name: 'relationTo',
			type: 'select',
			label: adminLabel('admin.blocks.archive.fieldRelationTo'),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			defaultValue: 'posts',
			options: [
				{
					label: adminLabel('admin.blocks.archive.optionRelationToPosts'),
					value: 'posts',
				},
			],
		},
		{
			name: PostCategoriesSlug,
			type: 'relationship',
			label: adminLabel('admin.blocks.archive.fieldPostCategories'),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
			},
			hasMany: true,
			relationTo: PostCategoriesSlug,
		},
		{
			name: 'limit',
			type: 'number',
			label: adminLabel('admin.blocks.archive.fieldLimit'),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'collection',
				step: 1,
			},
			defaultValue: 10,
		},
		{
			name: 'selectedDocs',
			type: 'relationship',
			label: adminLabel('admin.blocks.archive.fieldSelectedDocs'),
			admin: {
				condition: (_, siblingData) => siblingData.populateBy === 'selection',
			},
			hasMany: true,
			relationTo: ['posts'],
		},
	],
}
