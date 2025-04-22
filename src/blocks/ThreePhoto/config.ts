import { Media } from '@/collections/Media'
import { Block, CollectionSlug } from 'payload'

export const ThreePhotoBlockConf: Block = {
  slug: 'threePhoto',
  interfaceName: 'ThreePhotoBlockProps',
  fields: [
    {
      name: 'photoLeft',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
      label: 'Photo Left',
      required: true,
    },
    {
      name: 'photoCenter',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
      label: 'Photo Center',
      required: true,
    },
    {
      name: 'photoRight',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
      label: 'Photo Right',
      required: true,
    },
  ],
}
