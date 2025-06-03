import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'

export const CallToAddToCartBlockConf: Block = {
	slug: 'call-to-add-to-cart',
	interfaceName: 'CallToAddToCartBlockProps',
	imageURL: '/thumbs/cta-add-to-cart.avif',
	labels: {
		singular: {
			en: 'CTA (Add To Cart)',
			vi: 'Kêu gọi hành động (Thêm vào giỏ hàng)',
		},
		plural: {
			en: 'CTAs (Add To Cart)',
			vi: 'Kêu gọi hành động (Thêm vào giỏ hàng)',
		},
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				en: 'Image',
				vi: 'Hình ảnh',
			},
		},
		{
			name: 'content',
			type: 'richText',
			label: {
				en: 'Content',
				vi: 'Nội dung',
			},
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			defaultValue: 'MUA NGAY',
			required: true,
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				en: 'Product',
				vi: 'Sản phẩm',
			},
		},
	],
}
