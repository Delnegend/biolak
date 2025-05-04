import { Media } from '@/collections/Media'
import { Block, CollectionSlug } from 'payload'

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
			required: true,
			defaultValue: 'Chứng nhận bởi các tổ chức quốc tế',
		},
		{
			type: 'array',
			name: 'organizations',
			maxRows: 3,
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'description',
					type: 'text',
					required: true,
				},
				{
					name: 'logo',
					type: 'upload',
					relationTo: Media.slug as CollectionSlug,
				},
			],
		},
	],
}
