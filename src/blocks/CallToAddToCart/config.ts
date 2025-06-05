import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'

import { CallToAddToCartBlockDefaults as defaults } from './defaults'

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
			localized: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				en: 'Button Label',
				vi: 'Nhãn nút',
			},
			localized: true,
			defaultValue: defaults.buttonLabel,
			admin: {
				placeholder: defaults.buttonLabel(Lang.Vietnamese),
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				en: 'Product',
				vi: 'Sản phẩm',
			},
			required: true,
			admin: {
				condition: (data) => {
					const isProductDocument =
						!!data.reviewsVisible &&
						!!data.variants &&
						!!data.productCategories &&
						data.productSubCategories
					return !isProductDocument
				},
			},
		},
	],
}
