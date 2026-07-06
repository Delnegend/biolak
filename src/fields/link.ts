import type { Field, GroupField } from 'payload'

import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { adminLabel } from '@/utilities/adminLabel'
import deepMerge from '@/utilities/deepMerge'

export const LinkFieldRelations = [
	PagesSlug,
	PostCategoriesSlug,
	PostsSlug,
	ProductCategoriesSlug,
	ProductsSlug,
	ProductSubCategoriesSlug,
] as const

export type LinkFieldRelationsType = (typeof LinkFieldRelations)[number]

/**
 * ALWAYS use CMSLink component to render this field, check the
 * components of blocks that are using this field for example.
 *
 */
export function link({
	disableLabel = false,
	label,
	overrides = {},
}: {
	disableLabel?: boolean
	overrides?: Partial<GroupField>
	label?: {
		placeholder?: string
		defaultValue?: Record<string, string>
		required?: boolean
	}
} = {}): Field {
	const linkResult: GroupField = {
		name: 'link',
		type: 'group',
		admin: {
			hideGutter: true,
		},
		fields: [
			{
				type: 'row',
				fields: [
					{
						name: 'type',
						type: 'radio',
						label: adminLabel('admin.fields.link.linkType'),
						admin: {
							layout: 'horizontal',
							width: '50%',
						},
						defaultValue: 'reference',
						options: [
							{
								value: 'reference',
								label: adminLabel('admin.fields.link.internalLink'),
							},
							{
								value: 'custom',
								label: adminLabel('admin.fields.link.customUrl'),
							},
						],
					},
					{
						name: 'newTab',
						type: 'checkbox',
						label: adminLabel('admin.fields.link.openInNewTab'),
						admin: {
							style: {
								alignSelf: 'flex-end',
							},
							width: '50%',
						},
					},
				],
			},
		],
		label: adminLabel('admin.fields.link.link'),
	}

	const linkTypes: Field[] = [
		{
			name: 'reference',
			type: 'relationship',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'reference',
			},
			label: adminLabel('admin.fields.link.linkToInternal'),
			relationTo: [...LinkFieldRelations],
			required: true,
		},
		{
			name: 'url',
			type: 'text',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'custom',
			},
			label: adminLabel('admin.fields.link.customUrlLabel'),
			required: true,
		},
	]

	if (!disableLabel) {
		linkTypes.map((linkType) => ({
			...linkType,
			admin: {
				...linkType.admin,
				width: '50%',
			},
		}))

		linkResult.fields.push({
			type: 'row',
			fields: [
				...linkTypes,
				{
					name: 'label',
					type: 'text',
					admin: {
						width: '50%',
						placeholder: label?.placeholder,
					},
					label: adminLabel('admin.fields.link.label'),
					required: label?.required ?? true,
					localized: true,
					defaultValue: label?.defaultValue,
				},
			],
		})
	} else {
		linkResult.fields = [...linkResult.fields, ...linkTypes]
	}

	return deepMerge(linkResult, overrides)
}
