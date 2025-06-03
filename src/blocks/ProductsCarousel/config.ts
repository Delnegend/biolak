import { Block } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { link } from '@/fields/link'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'PRODUCTS BEING SOLD',
				[Lang.Vietnamese]: 'SẢN PHẨM BÁN CHẠY',
			}),
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
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'WATCH MORE',
				[Lang.Vietnamese]: 'XEM THÊM',
			}),
		},
		link({
			overrides: {
				name: 'apb',
				label: {
					en: 'All Products Button',
					vi: 'Nút xem tất cả sản phẩm',
				},
				localized: true,
				defaultValue: matchLang({
					[Lang.English]: 'VIEW ALL PRODUCTS',
					[Lang.Vietnamese]: 'XEM TẤT CẢ SẢN PHẨM',
				}),
			},
		}),
	],
}
