'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { useProductVariantContext } from './ProductVariantContext'

export function INTERNAL_ProductVariantsClient({
	variants,
	productSlug,
}: {
	variants: Product['variants']
	productSlug?: Product['slug']
}): React.JSX.Element {
	const { product, setProductSlugAndVariant } = useProductVariantContext()

	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{variants?.map((variant) => (
				<Button
					key={variant.id}
					onClick={() =>
						setProductSlugAndVariant({
							productSlug,
							variant,
						})
					}
					hideArrow={true}
					size="sm"
					variant="outline"
					className={cn(product.variant?.sku === variant.sku && 'border-black text-black')}
					disabled={variant.stock <= 0}
				>
					{variant.title}
				</Button>
			))}
		</div>
	)
}
