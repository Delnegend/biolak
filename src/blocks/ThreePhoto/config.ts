import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'

export const ThreePhotoBlockConf: Block = {
	slug: 'threePhoto',
	interfaceName: 'ThreePhotoBlockProps',
	imageURL: '/thumbs/three-photo.avif',
	labels: {
		plural: {
			en: 'Three Photos',
			vi: 'Ba hình ảnh',
		},
		singular: {
			en: 'Three Photo',
			vi: 'Ba hình ảnh',
		},
	},
	fields: [
		{
			name: 'photoLeft',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Photo Left',
				vi: 'Hình ảnh bên trái',
			},
		},
		{
			name: 'photoCenter',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Photo Center',
				vi: 'Hình ảnh ở giữa',
			},
		},
		{
			name: 'photoRight',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Photo Right',
				vi: 'Hình ảnh bên phải',
			},
		},
	],
}
