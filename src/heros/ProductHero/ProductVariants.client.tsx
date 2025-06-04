'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { useSelectProductVariant } from './ProductVariantContext'

export function INTERNAL_ProductVariantsClient({
	variants,
	product: { slug, title },
}: {
	variants: Product['variants']
	product: {
		slug: Product['slug']
		title: Product['title']
	}
}): React.JSX.Element {
	const { selectedProductVariant, setSelectedProductVariant } = useSelectProductVariant()

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
