'use client'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useNullableSelectedProductVariant } from '@/heros/ProductHero/ProductVariantContext'

export function INTERNAL_BuyNowClient(props: {
	productSlug?: string | null
	fallbackVariantSku?: string | null
	buttonLabel: string
}): React.JSX.Element {
	const variantSku =
		useNullableSelectedProductVariant()?.selectedProductVariant?.variant?.sku ??
		props.fallbackVariantSku

	return (
		<Button
			size="lg"
			variant="outline"
			className="w-full max-w-[47rem] justify-between border-primary text-primary"
			tabIndex={-1}
			disabled={!props.productSlug || !variantSku}
			asChild
		>
			<a href={'/checkout?product=' + props.productSlug + '&variant=' + variantSku}>
				{props.buttonLabel}
				<ArrowRight />
			</a>
		</Button>
	)
}
