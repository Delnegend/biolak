import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const CertificatesBlockConf: Block = {
	slug: 'certificates',
	interfaceName: 'CertificatesBlockProps',
	imageURL: '/thumbs/certificates.avif',
	labels: {
		plural: {
			en: 'Certificates',
			vi: 'Chứng nhận',
		},
		singular: {
			en: 'Certificate',
			vi: 'Chứng nhận',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
			defaultValue: 'Chứng nhận bởi các tổ chức quốc tế',
		},
		{
			type: 'array',
			name: 'organizations',
			label: {
				en: 'Organizations',
				vi: 'Tổ chức',
			},
			labels: {
				singular: {
					en: 'Organization',
					vi: 'Tổ chức',
				},
				plural: {
					en: 'Organizations',
					vi: 'Tổ chức',
				},
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: {
						en: 'Organization Name',
						vi: 'Tên tổ chức',
					},
					required: true,
				},
				{
					name: 'description',
					type: 'text',
					label: {
						en: 'Description',
						vi: 'Mô tả',
					},
					required: true,
				},
				{
					name: 'logo',
					type: 'upload',
					label: {
						en: 'Logo',
						vi: 'Logo',
					},
					relationTo: MediaSlug,
				},
			],
		},
	],
}
