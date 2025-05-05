import { Block } from 'payload'

import { Media } from '@/collections/Media'

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
			relationTo: Media.slug,
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
	],
}
