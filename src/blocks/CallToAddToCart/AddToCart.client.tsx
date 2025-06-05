'use client'

import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'
import { Product } from '@/payload-types'

export function INTERNAL_AddToCartClient({
	product,
	buttonLabel,
}: {
	product: {
		slug: Product['slug']
		title: Product['title']
		variant?: NonNullable<Product['variants']>[number] | null
	}
	buttonLabel: string
}): React.JSX.Element {
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })

	return (
		<Button
			size="lg"
			variant="outline"
			className="mt-6 w-full max-w-[47rem] border-primary text-primary"
			onClick={() => {
				if (!product?.slug || !product?.title || !product?.variant) return
				loadProduct({
					slug: product?.slug,
					title: product?.title,
					variant: product?.variant,
				})
			}}
			disabled={!product?.slug || !product?.title || !product?.variant}
		>
			{buttonLabel}
		</Button>
	)
}
