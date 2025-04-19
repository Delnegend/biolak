import { Block } from 'payload'

export const ThreePhoto: Block = {
  slug: 'threePhoto',
  interfaceName: 'ThreePhotoBlock',
  fields: [
    {
      name: 'photoLeft',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo Left',
      required: true,
    },
    {
      name: 'photoCenter',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo Center',
      required: true,
    },
    {
      name: 'photoRight',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo Right',
      required: true,
    },
  ],
}
