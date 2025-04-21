import { Block } from 'payload'

export const ProductsCarousel: Block = {
  slug: 'productsCarousel',
  interfaceName: 'ProductsCarouselProps',
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
