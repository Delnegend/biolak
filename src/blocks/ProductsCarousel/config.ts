import { Block } from 'payload'

export const ProductsCarouselBlockConf: Block = {
	slug: 'productsCarousel',
	interfaceName: 'ProductsCarouselBlockProps',
	imageURL: '/thumbs/products-carousel.avif',
	labels: {
		plural: {
			en: 'Products Carousel',
			vi: 'Sản phẩm trượt',
		},
		singular: {
			en: 'Product Carousel',
			vi: 'Sản phẩm trượt',
		},
	},
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
			labels: {
				plural: {
					en: 'Products',
					vi: 'Sản phẩm',
				},
				singular: {
					en: 'Product',
					vi: 'Sản phẩm',
				},
			},
		},
	],
}
