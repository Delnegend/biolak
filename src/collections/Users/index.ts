import type { CollectionConfig } from 'payload'

import { admin } from '../../access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: admin,
    create: admin,
    delete: admin,
    read: admin,
    update: admin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
    },
  ],
  timestamps: true,
}
