'use client'

import { Button } from '@/components/ui/button'
import { useSelectedProductVariant } from '@/heros/ProductHero/ProductVariantContext'
import { useCartManager } from '@/hooks/useCartManager'

export function INTERNAL_AddToCartClient({
	buttonLabel,
}: {
	buttonLabel: string
}): React.JSX.Element {
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="lg"
			variant="outline"
			className="mt-6 w-full max-w-[47rem] border-primary text-primary"
			onClick={() => {
				if (!selectedProductVariant) return
				loadProduct({
					product: selectedProductVariant.product,
					variant: selectedProductVariant.variant,
					quantity: 1,
					checked: true,
				})
			}}
			disabled={!selectedProductVariant}
		>
			{buttonLabel}
		</Button>
	)
}
