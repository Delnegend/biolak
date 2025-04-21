import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { Collection, CollectionConfig } from 'payload'

export const PRODUCT_CATEGORIES_SLUG = 'productCategories'
export const ProductCategories: CollectionConfig = {
  slug: PRODUCT_CATEGORIES_SLUG,
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
