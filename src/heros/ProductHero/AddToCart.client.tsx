'use client'

import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectProductVariant } from './ProductVariantContext'

export function INTERNAL_AddToCartClient(): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })
	const { product } = useSelectProductVariant()

	return (
		<Button
			size="lg"
			className="flex items-center justify-between gap-4 border-black uppercase text-black"
			hideArrow={true}
			variant="outline"
			onClick={() => {
				if (!product.slug || !product.title || !product.variant) return
				loadProduct(
					{
						slug: product.slug,
						title: product.title,
						variant: product.variant,
					},
					1,
				)
				toast.success(
					matchLang({
						[Lang.English]: `Added ${product.title} variant ${product.variant?.title} to cart`,
						[Lang.Vietnamese]: `Đã thêm ${product.title} loại ${product.variant?.title} vào giỏ hàng`,
					})({ locale }),
				)
			}}
			disabled={!product.slug || !product.title || !product.variant}
			aria-label={matchLang({
				[Lang.English]: `Add ${product.title} variant ${product.variant?.title} to cart`,
				[Lang.Vietnamese]: `Thêm ${product.title} loại ${product.variant?.title} vào giỏ hàng`,
			})({ locale })}
		>
			<span>
				{matchLang({
					[Lang.English]: 'ADD TO CART',
					[Lang.Vietnamese]: 'THÊM VÀO GIỎ',
				})({ locale })}
			</span>
			<ShoppingCart />
		</Button>
	)
}
