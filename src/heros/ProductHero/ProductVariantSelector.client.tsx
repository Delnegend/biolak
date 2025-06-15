'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_ProductVariantSelector({
	product,
	validVariant,
}: {
	product: {
		id: Product['id']
		title: Product['title']
		slug?: Product['slug']
		variants?: Product['variants']
	}
	validVariant?: {
		sku: Product['variants'][number]['sku']
		title: Product['variants'][number]['title']
		price: Product['variants'][number]['price']
		image?: Product['variants'][number]['image']
	} | null
}): React.JSX.Element {
	const { selectedProductVariant, setSelectedProductVariant } = useSelectedProductVariant()

	useEffect(() => {
		if (validVariant)
			setSelectedProductVariant({
				product: product,
				variant: validVariant,
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!product.variants || product.variants.length === 1) {
		return <></>
	}

	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{product.variants?.map((variant) => (
				<Button
					key={variant.id}
					onClick={() =>
						setSelectedProductVariant({
							product,
							variant,
						})
					}
					hideArrow={true}
					size="sm"
					variant="outline"
					className={cn(
						selectedProductVariant?.variant.sku === variant.sku && 'border-black text-black',
					)}
					disabled={variant.stock <= 0}
				>
					{variant.title}
				</Button>
			))}
		</div>
	)
}
