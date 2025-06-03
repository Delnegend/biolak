import Image from 'next/image'

import { ProductsSlug } from '@/collections/Products/slug'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'
import { CallToAddToCartBlockProps, Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export function CallToAddToCartBlockComponent(passdownProps: {
	product?: Product | null
}): (_: CallToAddToCartBlockProps) => Promise<React.JSX.Element> {
	return async function CallToAddToCartBlockComponentInner(
		props: CallToAddToCartBlockProps,
	): Promise<React.JSX.Element> {
		const locale = await getClientLang()
		const { loadProduct } = useCartManager({ syncWithLocalStorage: true })

		const img = props.image && typeof props.image === 'object' ? props.image : null
		const p =
			typeof props[ProductsSlug] === 'object' && !!props[ProductsSlug]
				? props[ProductsSlug]
				: passdownProps.product
		if (!p) {
			throw new Error(
				'CallToAddToCartBlock must be used within a product page or specified with a product prop',
			)
		}

		return (
			<div className="safe-width my-28 flex !max-w-[50rem] flex-col items-center text-primary">
				<Image
					src={img?.url ?? 'https://placehold.co/600x600'}
					alt={
						img?.alt ??
						matchLang({
							[Lang.English]: 'Background image for call to add to cart button',
							[Lang.Vietnamese]: 'Hình nền cho nút thêm vào giỏ hàng',
						})({ locale })
					}
					width={img?.width ?? 600}
					height={img?.height ?? 600}
					unoptimized={!img}
					className="aspect-square size-full max-w-[38rem] rounded-full object-cover"
				/>
				{props.content && (
					<RichText
						data={props.content}
						enableGutter={false}
						className="mt-4 [&_li]:text-xl"
					/>
				)}
				<Button
					size="lg"
					variant="outline"
					className="mt-6 w-full max-w-[47rem] border-primary text-primary"
					onClick={() => {
						loadProduct(
							{
								slug: p.slug,
								title: p.title,
								price: p.price,
							},
							1,
						)
					}}
				>
					{props.buttonLabel}
				</Button>
			</div>
		)
	}
}
