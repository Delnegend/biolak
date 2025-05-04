import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<
	LinkAppearances,
	{
		label: {
			en: string
			vi: string
		}
		value: string
	}
> = {
	default: {
		value: 'default',
		label: {
			en: 'Default',
			vi: 'Mặc định',
		},
	},
	outline: {
		value: 'outline',
		label: {
			en: 'Outline',
			vi: 'Viền ngoài',
		},
	},
}

type LinkType = (options?: {
	appearances?: LinkAppearances[] | false
	disableLabel?: boolean
	overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
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
				en: 'Document to link to',
				vi: 'Tài liệu liên kết đến',
			},
			relationTo: ['pages', 'posts'],
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

	if (appearances !== false) {
		let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

		if (appearances) {
			appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
		}

		linkResult.fields.push({
			name: 'appearance',
			type: 'select',
			admin: {
				description: {
					en: 'Choose how the link should be rendered.',
					vi: 'Chọn cách liên kết sẽ được hiển thị.',
				},
			},
			defaultValue: 'default',
			options: appearanceOptionsToUse,
			label: {
				en: 'Appearance',
				vi: 'Kiểu dáng',
			},
		})
	}

	return deepMerge(linkResult, overrides)
}
