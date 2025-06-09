import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

import { CertificatesBlockDefaults as defaults } from './defaults'

export const CertificatesBlockConf: Block = {
	slug: 'certificates',
	interfaceName: 'CertificatesBlockProps',
	imageURL: '/thumbs/certificates.avif',
	labels: {
		plural: {
			[Lang.English]: 'Certificates',
			[Lang.Vietnamese]: 'Chứng nhận',
		},
		singular: {
			[Lang.English]: 'Certificate',
			[Lang.Vietnamese]: 'Chứng nhận',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			localized: true,
			defaultValue: defaults.title,
			admin: {
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			type: 'array',
			name: 'organizations',
			label: {
				[Lang.English]: 'Organizations',
				[Lang.Vietnamese]: 'Tổ chức',
			},
			labels: {
				singular: {
					[Lang.English]: 'Organization',
					[Lang.Vietnamese]: 'Tổ chức',
				},
				plural: {
					[Lang.English]: 'Organizations',
					[Lang.Vietnamese]: 'Tổ chức',
				},
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: {
						[Lang.English]: 'Organization Name',
						[Lang.Vietnamese]: 'Tên tổ chức',
					},
					required: true,
					localized: true,
				},
				{
					name: 'description',
					type: 'text',
					label: {
						[Lang.English]: 'Description',
						[Lang.Vietnamese]: 'Mô tả',
					},
					localized: true,
				},
				{
					name: 'logo',
					type: 'upload',
					label: {
						[Lang.English]: 'Logo',
						[Lang.Vietnamese]: 'Logo',
					},
					relationTo: MediaSlug,
				},
			],
		},
	],
}
