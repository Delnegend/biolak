import { Block } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/i18n/routing'

export const CallToAddToCartBlockConf: Block = {
	slug: 'call-to-add-to-cart',
	interfaceName: 'CallToAddToCartBlockProps',
	imageURL: '/thumbs/cta-add-to-cart.avif',
	labels: {
		singular: {
			[Lang.English]: 'CTA (Add To Cart)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Thêm vào giỏ hàng)',
		},
		plural: {
			[Lang.English]: 'CTAs (Add To Cart)',
			[Lang.Vietnamese]: 'Kêu gọi hành động (Thêm vào giỏ hàng)',
		},
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: MediaSlug,
			label: {
				[Lang.English]: 'Image',
				[Lang.Vietnamese]: 'Hình ảnh',
			},
		},
		{
			name: 'content',
			type: 'richText',
			label: {
				[Lang.English]: 'Content',
				[Lang.Vietnamese]: 'Nội dung',
			},
			localized: true,
		},
		{
			name: 'buttonLabel',
			type: 'text',
			label: {
				[Lang.English]: 'Button Label',
				[Lang.Vietnamese]: 'Nhãn nút',
			},
			localized: true,
			admin: {
				placeholder: 'THÊM VÀO GIỎ HÀNG',
			},
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				[Lang.English]: 'Product',
				[Lang.Vietnamese]: 'Sản phẩm',
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
