import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { Lang } from '@/i18n/routing'

export const ProductsCarouselBlockConf: Block = {
	slug: 'productsCarousel',
	interfaceName: 'ProductsCarouselBlockProps',
	imageURL: '/thumbs/products-carousel.avif',
	labels: {
		plural: {
			[Lang.English]: 'Products Carousel',
			[Lang.Vietnamese]: 'Sản phẩm trượt',
		},
		singular: {
			[Lang.English]: 'Product Carousel',
			[Lang.Vietnamese]: 'Sản phẩm trượt',
		},
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				[Lang.English]: 'Title',
				[Lang.Vietnamese]: 'Tiêu đề',
			},
			localized: true,
			admin: {
				placeholder: 'SẢN PHẨM BÁN CHẠY',
			},
		},
		{
			name: 'products',
			type: 'relationship',
			label: {
				[Lang.English]: 'Products',
				[Lang.Vietnamese]: 'Sản phẩm',
			},
			relationTo: ProductsSlug,
			hasMany: true,
		},
		{
			name: 'watchMoreBtnLabel',
			type: 'text',
			label: {
				[Lang.English]: 'Watch More Button Label',
				[Lang.Vietnamese]: 'Nhãn nút xem thêm',
			},
			localized: true,
			admin: {
				placeholder: 'XEM THÊM',
			},
		},
		link({
			overrides: {
				name: 'apb',
				label: {
					[Lang.English]: 'All Products Button',
					[Lang.Vietnamese]: 'Nút xem tất cả sản phẩm',
				},
				localized: true,
				required: true,
			},
			label: {
				placeholder: 'XEM TẤT CẢ SẢN PHẨM',
				required: false,
			},
		}),
	],
}
