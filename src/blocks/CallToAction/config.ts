import { Media } from '@/collections/Media'
import { link } from '@/fields/link'
import type { Block, CollectionSlug } from 'payload'

export const CallToActionBlockConf: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlockProps',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sub-title',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'centered',
      options: [
        {
          label: 'Centered',
          value: 'centered',
        },
        {
          label: 'Left',
          value: 'left',
        },
      ],
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        link({ appearances: false, disableLabel: true }),
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
