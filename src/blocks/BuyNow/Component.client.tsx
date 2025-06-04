'use client'

import { Button } from '@/components/ui/button'
import { useSelectProductVariantUnsafe } from '@/heros/ProductHero/ProductVariantContext'

export function INTERNAL_BuyNowClient(props: {
	productSlug?: string | null
	fallbackVariantSku?: string | null
	buttonLabel: string
}): React.JSX.Element {
	const tmp = useSelectProductVariantUnsafe()
	const variantSku = tmp?.selectedProductVariant?.variant?.sku

	return (
		<Button
			size="lg"
			variant="outline"
			className="w-full max-w-[47rem] border-primary text-primary"
			tabIndex={-1}
			disabled={!props.productSlug || !variantSku}
		>
			<a
				href={
					'/checkout?product=' +
					props.productSlug +
					'&variant=' +
					(variantSku ?? props.fallbackVariantSku)
				}
			>
				{props.buttonLabel}
			</a>
		</Button>
	)
}
