import type { CollectionSlug, Field } from 'payload'

import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { admin } from '@/access/admin'
import { Media } from '@/collections/Media'
import { linkGroup } from '@/fields/linkGroup'

export const HeroFieldConf: Field = {
	name: 'hero',
	type: 'group',
	access: {
		create: admin,
		read: () => true,
		update: admin,
	},
	fields: [
		{
			name: 'type',
			type: 'select',
			defaultValue: 'lowImpact',
			label: {
				en: 'Type',
				vi: 'Kiểu',
			},
			options: [
				{
					value: 'none',
					label: {
						en: 'None',
						vi: 'Không có',
					},
				},
				{
					value: 'highImpact',
					label: {
						en: 'High Impact',
						vi: 'Tác động lớn',
					},
				},
				{
					value: 'mediumImpact',
					label: {
						en: 'Medium Impact',
						vi: 'Tác động vừa phải',
					},
				},
				{
					value: 'lowImpact',
					label: {
						en: 'Low Impact',
						vi: 'Tác động thấp',
					},
				},
			],
			required: true,
		},
		{
			name: 'richText',
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
			label: false,
		},
		linkGroup({
			overrides: {
				maxRows: 2,
			},
		}),
		{
			name: 'media',
			type: 'upload',
			label: {
				en: 'Media',
				vi: 'Phương tiện',
			},
			relationTo: Media.slug as CollectionSlug,
		},
	],
	label: false,
}
