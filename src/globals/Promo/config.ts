import { admin } from '@/access/admin'
import { link } from '@/fields/link'
import { type GlobalConfig } from 'payload'
import { revalidatePromo } from './hooks/revalidatePromo'

export const Promo: GlobalConfig = {
  slug: 'promo',
  access: {
    read: () => true,
    update: admin,
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      defaultValue: '',
    },
    link({ appearances: false }),
  ],
  hooks: {
    afterChange: [revalidatePromo],
  },
}
