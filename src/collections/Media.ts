import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { CollectionConf } from '@/utilities/types'

import { admin } from '../access/admin'
import { anyone } from '../access/anyone'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConf<'media'> = {
	slug: 'media',
	labels: {
		singular: {
			en: 'Media',
			vi: 'Ảnh và video',
		},
		plural: {
			en: 'Media',
			vi: 'Ảnh và video',
		},
	},
	access: {
		create: admin,
		delete: admin,
		read: anyone,
		update: admin,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			//required: true,
			label: {
				en: 'Alt Text',
				vi: 'Văn bản thay thế',
			},
		},
		{
			name: 'caption',
			type: 'richText',
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
				},
			}),
			label: {
				en: 'Caption',
				vi: 'Chú thích',
			},
		},
	],
	upload: {
		// Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
		staticDir: path.resolve(dirname, '../../public/media'),
		adminThumbnail: 'thumbnail',
		focalPoint: true,
		imageSizes: [
			{
				name: 'thumbnail',
				width: 300,
			},
			{
				name: 'square',
				width: 500,
				height: 500,
			},
			{
				name: 'small',
				width: 600,
			},
			{
				name: 'medium',
				width: 900,
			},
			{
				name: 'large',
				width: 1400,
			},
			{
				name: 'xlarge',
				width: 1920,
			},
			{
				name: 'og',
				width: 1200,
				height: 630,
				crop: 'center',
			},
		],
	},
}
