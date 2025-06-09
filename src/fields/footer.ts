import { SelectField } from 'payload'

import { Lang } from '@/utilities/lang'

export const FooterSizeField: SelectField = {
	type: 'select',
	name: 'footerSize',
	label: {
		[Lang.English]: 'Select Footer Size',
		[Lang.Vietnamese]: 'Chọn kích thước Footer',
	},
	defaultValue: 'small',
	options: [
		{
			label: {
				[Lang.English]: 'Small',
				[Lang.Vietnamese]: 'Nhỏ',
			},
			value: 'small',
		},
		{
			label: {
				[Lang.English]: 'Medium',
				[Lang.Vietnamese]: 'Trung bình',
			},
			value: 'medium',
		},
		{
			label: {
				[Lang.English]: 'Large',
				[Lang.Vietnamese]: 'Lớn',
			},
			value: 'large',
		},
	],
	admin: {
		position: 'sidebar',
	},
}
