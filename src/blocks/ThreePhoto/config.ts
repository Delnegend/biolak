import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'

export const ThreePhotoBlockConf: Block = {
	slug: 'threePhoto',
	interfaceName: 'ThreePhotoBlockProps',
	imageURL: '/thumbs/three-photo.avif',
	labels: {
		plural: {
			[Lang.English]: 'Three Photos',
			[Lang.Vietnamese]: 'Ba hình ảnh',
		},
		singular: {
			[Lang.English]: 'Three Photo',
			[Lang.Vietnamese]: 'Ba hình ảnh',
		},
	},
	fields: [
		{
			name: 'photoLeft',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Photo Left',
				[Lang.Vietnamese]: 'Hình ảnh bên trái',
			},
		},
		{
			name: 'photoCenter',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Photo Center',
				[Lang.Vietnamese]: 'Hình ảnh ở giữa',
			},
		},
		{
			name: 'photoRight',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Photo Right',
				[Lang.Vietnamese]: 'Hình ảnh bên phải',
			},
		},
	],
}
