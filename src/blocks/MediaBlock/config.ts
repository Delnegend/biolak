import { MEDIA_SLUG } from '@/collections/Media'
import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: true,
    },
  ],
}
