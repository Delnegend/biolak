import { Media } from '@/collections/Media'
import { link } from '@/fields/link'
import type { Block, CollectionSlug } from 'payload'

export const CallToActionLeftBlockConf: Block = {
  slug: 'cta-left',
  interfaceName: 'CallToActionLeftBlockProps',
  imageURL: '/thumbs/call-to-action-left.avif',
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
    plural: 'Calls to Action Left',
    singular: 'Call to Action Left',
  },
}
