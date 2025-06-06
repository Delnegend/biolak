'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_ProductVariantsClient({
	variants,
	product: { slug, title },
	validVariant,
}: {
	variants: Product['variants']
	product: {
		slug: Product['slug']
		title: Product['title']
	}
	validVariant?: Product['variants'][number] | null
}): React.JSX.Element {
	const { selectedProductVariant, setSelectedProductVariant } = useSelectedProductVariant()

	useEffect(() => {
		if (!validVariant) return
		setSelectedProductVariant({
			slug,
			title,
			variant: validVariant,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!variants || variants.length === 1) {
		return <></>
	}

	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{variants?.map((variant) => (
				<Button
					key={variant.id}
					onClick={() =>
						setSelectedProductVariant({
							slug,
							title,
							variant,
						})
					}
					hideArrow={true}
					size="sm"
					variant="outline"
					className={cn(
						selectedProductVariant?.variant?.sku === variant.sku && 'border-black text-black',
					)}
					disabled={variant.stock <= 0}
				>
					{variant.title}
				</Button>
			))}
		</div>
	)
}
