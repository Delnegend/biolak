import Image from 'next/image'

import { ProductsSlug } from '@/collections/Products/slug'
import RichText from '@/components/RichText'
import { CallToAddToCartBlockProps, Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { INTERNAL_AddToCartClient } from './AddToCart.client'
import { CallToAddToCartBlockDefaults as defaults } from './defaults'

export async function CallToAddToCartBlock(
	props: CallToAddToCartBlockProps & {
		__product?: Product | null
	},
): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	const img = props.image && typeof props.image === 'object' ? props.image : null
	const p =
		typeof props[ProductsSlug] === 'object' && !!props[ProductsSlug]
			? props[ProductsSlug]
			: props?.__product
	if (!p) {
		throw new Error(
			'CallToAddToCartBlock must be used within a product page or specified with a product prop',
		)
	}

	const variant =
		p.variants?.find((v) => v.defaultVariant && v.stock > 0) ??
		p.variants.find((v) => v.stock > 0)

	return (
		<div className="safe-width my-28 flex !max-w-[50rem] flex-col items-center text-primary">
			<Image
				src={img?.url ?? 'https://placehold.co/600x600'}
				alt={
					img?.alt ??
					matchLang({
						[Lang.English]: 'Background image for call to add to cart button',
						[Lang.Vietnamese]: 'Hình nền cho nút thêm vào giỏ hàng',
					})(locale)
				}
				width={img?.width ?? 600}
				height={img?.height ?? 600}
				unoptimized={!img}
				className="aspect-square size-full max-w-[38rem] rounded-full object-cover"
			/>
			{props.content && (
				<RichText data={props.content} enableGutter={false} className="mt-4 [&_li]:text-xl" />
			)}
			<INTERNAL_AddToCartClient
				buttonLabel={props.buttonLabel ?? defaults.buttonLabel(locale)}
				product={{
					slug: p.slug,
					title: p.title,
					variant,
				}}
			/>
		</div>
	)
}
