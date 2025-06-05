import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'

import { ProductsCarouselBlockDefaults } from './defaults'

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
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			localized: true,
			defaultValue: ProductsCarouselBlockDefaults.title,
			admin: {
				placeholder: ProductsCarouselBlockDefaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'products',
			type: 'relationship',
			label: {
				en: 'Products',
				vi: 'Sản phẩm',
			},
			relationTo: ProductsSlug,
			hasMany: true,
		},
		{
			name: 'watchMoreBtnLabel',
			type: 'text',
			label: {
				en: 'Watch More Button Label',
				vi: 'Nhãn nút xem thêm',
			},
			localized: true,
			defaultValue: ProductsCarouselBlockDefaults.watchMoreBtnLabel,
			admin: {
				placeholder: ProductsCarouselBlockDefaults.watchMoreBtnLabel(Lang.Vietnamese),
			},
		},
		link({
			overrides: {
				name: 'apb',
				label: {
					en: 'All Products Button',
					vi: 'Nút xem tất cả sản phẩm',
				},
				localized: true,
				required: true,
				defaultValue: ProductsCarouselBlockDefaults.allProductsBtnLabel,
			},
			label: {
				placeholder: ProductsCarouselBlockDefaults.allProductsBtnLabel(Lang.Vietnamese),
				required: false,
			},
		}),
	],
}
