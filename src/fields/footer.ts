import { SelectField } from 'payload'

export const FooterSizeField: SelectField = {
	type: 'select',
	name: 'footerSize',
	label: {
		en: 'Select Footer Size',
		vi: 'Chọn kích thước Footer',
	},
	defaultValue: 'small',
	options: [
		{
			label: {
				en: 'Small',
				vi: 'Nhỏ',
			},
			value: 'small',
		},
		{
			label: {
				en: 'Medium',
				vi: 'Trung bình',
			},
			value: 'medium',
		},
		{
			label: {
				en: 'Large',
				vi: 'Lớn',
			},
			value: 'large',
		},
	],
	admin: {
		position: 'sidebar',
	},
}
