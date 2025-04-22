import { Block } from 'payload'

export const ProductsCarouselBlockConf: Block = {
  slug: 'productsCarousel',
  interfaceName: 'ProductsCarouselBlockProps',
  fields: [
    {
      name: 'products',
      label: 'Products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          label: 'Product',
          required: true,
          relationTo: 'products',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
  ],
}
