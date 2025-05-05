import { Block } from 'payload'

import { Media } from '@/collections/Media'

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
			relationTo: Media.slug,
			label: {
				en: 'Photo Left',
				vi: 'Hình ảnh bên trái',
			},
			required: true,
		},
		{
			name: 'photoCenter',
			type: 'upload',
			relationTo: Media.slug,
			label: {
				en: 'Photo Center',
				vi: 'Hình ảnh ở giữa',
			},
			required: true,
		},
		{
			name: 'photoRight',
			type: 'upload',
			relationTo: Media.slug,
			label: {
				en: 'Photo Right',
				vi: 'Hình ảnh bên phải',
			},
			required: true,
		},
	],
}
