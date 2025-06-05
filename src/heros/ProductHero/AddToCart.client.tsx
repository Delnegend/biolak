'use client'

import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_AddToCartClient({
	hasAtLeastOneProductInStock,
}: {
	hasAtLeastOneProductInStock: boolean
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 border-black uppercase text-black"
			hideArrow={true}
			variant="outline"
			onClick={() => {
				if (
					!selectedProductVariant?.slug ||
					!selectedProductVariant?.title ||
					!selectedProductVariant?.variant
				)
					return
				loadProduct({
					slug: selectedProductVariant?.slug,
					title: selectedProductVariant?.title,
					variant: selectedProductVariant?.variant,
				})
				toast.success(
					matchLang({
						[Lang.English]: `Added ${selectedProductVariant?.title} variant ${selectedProductVariant?.variant?.title} to cart`,
						[Lang.Vietnamese]: `Đã thêm ${selectedProductVariant?.title} loại ${selectedProductVariant?.variant?.title} vào giỏ hàng`,
					})(locale),
				)
			}}
			disabled={
				!selectedProductVariant?.slug ||
				!selectedProductVariant?.title ||
				!selectedProductVariant?.variant
			}
			aria-label={matchLang({
				[Lang.English]: `Add ${selectedProductVariant?.title} variant ${selectedProductVariant?.variant?.title} to cart`,
				[Lang.Vietnamese]: `Thêm ${selectedProductVariant?.title} loại ${selectedProductVariant?.variant?.title} vào giỏ hàng`,
			})(locale)}
		>
			<span>
				{matchLang({
					[Lang.English]: hasAtLeastOneProductInStock ? 'ADD TO CART' : 'OUT OF STOCK',
					[Lang.Vietnamese]: hasAtLeastOneProductInStock ? 'THÊM VÀO GIỎ' : 'HẾT HÀNG',
				})(locale)}
			</span>
			<ShoppingCart />
		</Button>
	)
}
