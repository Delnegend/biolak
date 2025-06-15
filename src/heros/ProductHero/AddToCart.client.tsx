'use client'

import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_AddToCartButton({
	locale,
	disabled,
}: {
	locale?: Lang
	disabled?: boolean
}): React.JSX.Element {
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 border-black uppercase text-black"
			hideArrow={true}
			variant="outline"
			onClick={() => {
				if (!selectedProductVariant?.product.id || !selectedProductVariant?.variant.sku) return
				loadProduct({
					...selectedProductVariant,
					quantity: 1,
					checked: true,
				})
				toast.success(
					matchLang({
						[Lang.English]: `Added ${selectedProductVariant.product.title} variant ${selectedProductVariant?.variant.title} to cart`,
						[Lang.Vietnamese]: `Đã thêm ${selectedProductVariant.product.title} loại ${selectedProductVariant?.variant.title} vào giỏ hàng`,
					})(locale),
				)
			}}
			disabled={!selectedProductVariant || disabled}
			aria-label={matchLang({
				[Lang.English]: `Add ${selectedProductVariant?.product.title} variant ${selectedProductVariant?.variant.title} to cart`,
				[Lang.Vietnamese]: `Thêm ${selectedProductVariant?.product.title} loại ${selectedProductVariant?.variant.title} vào giỏ hàng`,
			})(locale)}
		>
			<span>
				{matchLang({
					[Lang.English]: disabled ? 'OUT OF STOCK' : 'ADD TO CART',
					[Lang.Vietnamese]: disabled ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ',
				})(locale)}
			</span>
			<ShoppingCart />
		</Button>
	)
}
