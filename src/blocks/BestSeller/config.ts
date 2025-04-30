import { Product } from '@/collections/Products'
import { Block, CollectionSlug } from 'payload'

export const BestSellerBlockConf: Block = {
  slug: 'bestSeller',
  interfaceName: 'BestSellerBlockProps',
  imageURL: '/thumbs/bestseller.avif',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Sản phẩm bán chạy',
      label: {
        vi: 'Tiêu đề',
        en: 'Title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: Product.slug as CollectionSlug,
        },
      ],
    },
  ],
}
