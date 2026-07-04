import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const CertificatesBlockConf: Block = {
	slug: 'certificates',
	interfaceName: 'CertificatesBlockProps',
	imageURL: '/thumbs/certificates.avif',
	labels: {
		plural: adminLabel('admin.blocks.certificates.labelPlural'),
		singular: adminLabel('admin.blocks.certificates.label'),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: adminLabel('admin.blocks.certificates.fieldTitle'),
			localized: true,
			admin: {
				placeholder: adminLabel('admin.blocks.certificates.placeholderTitle'),
			},
		},
		{
			type: 'array',
			name: 'organizations',
			label: adminLabel('admin.blocks.certificates.fieldOrganizations'),
			labels: {
				singular: adminLabel('admin.blocks.certificates.arrayOrganizationsSingular'),
				plural: adminLabel('admin.blocks.certificates.arrayOrganizationsPlural'),
			},
			fields: [
				{
					name: 'title',
					type: 'text',
					label: adminLabel('admin.blocks.certificates.fieldOrgTitle'),
					required: true,
					localized: true,
				},
				{
					name: 'description',
					type: 'text',
					label: adminLabel('admin.blocks.certificates.fieldOrgDescription'),
					localized: true,
				},
				{
					name: 'logo',
					type: 'upload',
					label: adminLabel('admin.blocks.certificates.fieldOrgLogo'),
					relationTo: MediaSlug,
				},
			],
		},
	],
}
