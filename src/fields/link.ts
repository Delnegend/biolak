import type { Field, GroupField } from 'payload'

import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
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
	overrides = {},
}: {
	disableLabel?: boolean
	overrides?: Partial<GroupField>
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
						label: {
							en: 'Link type',
							vi: 'Loại liên kết',
						},
						admin: {
							layout: 'horizontal',
							width: '50%',
						},
						defaultValue: 'reference',
						options: [
							{
								value: 'reference',
								label: {
									en: 'Internal link',
									vi: 'Liên kết nội bộ',
								},
							},
							{
								value: 'custom',
								label: {
									en: 'Custom URL',
									vi: 'Liên kết tùy chỉnh',
								},
							},
						],
					},
					{
						name: 'newTab',
						type: 'checkbox',
						label: {
							en: 'Open in new tab',
							vi: 'Mở trong tab mới',
						},
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
		label: {
			en: 'Link',
			vi: 'Liên kết',
		},
	}

	const linkTypes: Field[] = [
		{
			name: 'reference',
			type: 'relationship',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'reference',
			},
			label: {
				en: 'Link to internal page',
				vi: 'Liên kết tới trang nội bộ',
			},
			relationTo: [...LinkFieldRelations],
			required: true,
		},
		{
			name: 'url',
			type: 'text',
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'custom',
			},
			label: {
				en: 'Custom URL',
				vi: 'Liên kết tùy chỉnh',
			},
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
					},
					label: {
						en: 'Label',
						vi: 'Nhãn',
					},
					required: true,
				},
			],
		})
	} else {
		linkResult.fields = [...linkResult.fields, ...linkTypes]
	}

	return deepMerge(linkResult, overrides)
}
