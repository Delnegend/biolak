import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const Product: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: admin,
    read: anyone,
    update: admin,
    delete: admin,
  },
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
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      minRows: 0,
      maxRows: 50,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
    },
  ],
}
