'use client'

import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useClientLang } from '@/hooks/useClientLang'
import { BasicProduct, cartManager } from '@/utilities/cartManager'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export function INTERNAL_AddToCartClient(props: { product: BasicProduct }): React.JSX.Element {
	const { lang: locale } = useClientLang()

	return (
		<Button
			size="lg"
			className="flex items-center justify-between gap-4 border-black uppercase text-black"
			hideArrow={true}
			variant="outline"
			onClick={() => {
				cartManager.load(props.product)
				toast.success(
					matchLang({
						[Lang.English]: `Added ${props.product.title} to cart`,
						[Lang.Vietnamese]: `Đã thêm ${props.product.title} vào giỏ hàng`,
					})({ locale }),
				)
			}}
			aria-label={matchLang({
				[Lang.English]: `Add ${props.product.title} to cart`,
				[Lang.Vietnamese]: `Thêm ${props.product.title} vào giỏ hàng`,
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
