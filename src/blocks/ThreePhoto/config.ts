import { MEDIA_SLUG } from '@/collections/Media'
import { Block } from 'payload'

export const ThreePhoto: Block = {
  slug: 'threePhoto',
  interfaceName: 'ThreePhotoBlock',
  fields: [
    {
      name: 'photoLeft',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      label: 'Photo Left',
      required: true,
    },
    {
      name: 'photoCenter',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      label: 'Photo Center',
      required: true,
    },
    {
      name: 'photoRight',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      label: 'Photo Right',
      required: true,
    },
  ],
}
