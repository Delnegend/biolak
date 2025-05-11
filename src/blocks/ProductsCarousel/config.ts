import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'

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
			name: 'title',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			type: 'text',
			defaultValue: 'Sản phẩm bán chạy',
			required: true,
		},
		{
			name: 'products',
			label: {
				en: 'Products',
				vi: 'Sản phẩm',
			},
			type: 'relationship',
			relationTo: ProductsSlug,
			hasMany: true,
		},
	],
}
