import { CollectionConfig, CollectionSlug } from 'payload'
import { admin } from '../../access/admin'
import { anyone } from '../../access/anyone'
import { Media } from '../Media'
import { PRODUCT_CATEGORIES_SLUG } from '../ProductCategories'
import { PRODUCT_SUB_CATEGORY_SLUG } from '../ProductSubCategories'

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
      name: PRODUCT_SUB_CATEGORY_SLUG,
      type: 'relationship',
      relationTo: PRODUCT_SUB_CATEGORY_SLUG,
    },
    {
      name: PRODUCT_CATEGORIES_SLUG,
      type: 'relationship',
      relationTo: PRODUCT_CATEGORIES_SLUG,
    },
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
          relationTo: Media.slug as CollectionSlug,
          label: 'Image',
          required: true,
        },
      ],
    },
  ],
}
