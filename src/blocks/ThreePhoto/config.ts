import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { adminLabel } from '@/utilities/adminLabel'

export const ThreePhotoBlockConf: Block = {
	slug: 'threePhoto',
	interfaceName: 'ThreePhotoBlockProps',
	imageURL: '/thumbs/three-photo.avif',
	labels: {
		plural: adminLabel('admin.blocks.threePhoto.labelPlural'),
		singular: adminLabel('admin.blocks.threePhoto.label'),
	},
	fields: [
		{
			name: 'photoLeft',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.threePhoto.fieldPhotoLeft'),
		},
		{
			name: 'photoCenter',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.threePhoto.fieldPhotoCenter'),
		},
		{
			name: 'photoRight',
			type: 'upload',
			relationTo: MediaSlug,
			label: adminLabel('admin.blocks.threePhoto.fieldPhotoRight'),
		},
	],
}
