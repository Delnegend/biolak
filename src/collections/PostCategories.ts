import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { admin } from '../access/admin'
import { anyone } from '../access/anyone'

export const POST_CATEGORIES_SLUG = 'postCategories'
export const PostCategories: CollectionConfig = {
  slug: POST_CATEGORIES_SLUG,
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    useAsTitle: 'title',
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
