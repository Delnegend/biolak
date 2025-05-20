import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'

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
		{
			name: 'watchMoreBtnLabel',
			label: {
				en: 'Watch More Button Label',
				vi: 'Nhãn nút xem thêm',
			},
			type: 'text',
			defaultValue: 'XEM THÊM',
			required: true,
		},
		link({
			overrides: {
				name: 'apb',
				label: {
					en: 'All Products Button',
					vi: 'Nút xem tất cả sản phẩm',
				},
				defaultValue: 'XEM TẤT CẢ SẢN PHẨM',
			},
		}),
	],
}
