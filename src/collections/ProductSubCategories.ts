import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'
import { PRODUCT_CATEGORIES_SLUG } from './ProductCategories'

export const PRODUCT_SUB_CATEGORY_SLUG = 'productSubCategories'
export const ProductSubCategories: CollectionConfig = {
  slug: PRODUCT_SUB_CATEGORY_SLUG,
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: PRODUCT_CATEGORIES_SLUG,
      type: 'relationship',
      relationTo: PRODUCT_CATEGORIES_SLUG,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
  admin: {
    useAsTitle: 'title',
  },
}
