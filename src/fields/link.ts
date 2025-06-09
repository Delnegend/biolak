import type { Field, GroupField } from 'payload'

import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import deepMerge from '@/utilities/deepMerge'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
		defaultValue?: ReturnType<typeof matchLang>
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
						label: {
							[Lang.English]: 'Link type',
							[Lang.Vietnamese]: 'Loại liên kết',
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
									[Lang.English]: 'Internal link',
									[Lang.Vietnamese]: 'Liên kết nội bộ',
								},
							},
							{
								value: 'custom',
								label: {
									[Lang.English]: 'Custom URL',
									[Lang.Vietnamese]: 'Liên kết tùy chỉnh',
								},
							},
						],
					},
					{
						name: 'newTab',
						type: 'checkbox',
						label: {
							[Lang.English]: 'Open in new tab',
							[Lang.Vietnamese]: 'Mở trong tab mới',
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
			[Lang.English]: 'Link',
			[Lang.Vietnamese]: 'Liên kết',
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
				[Lang.English]: 'Link to internal page',
				[Lang.Vietnamese]: 'Liên kết tới trang nội bộ',
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
				[Lang.English]: 'Custom URL',
				[Lang.Vietnamese]: 'Liên kết tùy chỉnh',
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
						placeholder: label?.placeholder,
					},
					label: {
						[Lang.English]: 'Label',
						[Lang.Vietnamese]: 'Nhãn',
					},
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
