'use client'

import { CirclePlus } from 'lucide-react'

import { useCartManager } from '@/hooks/useCartManager'
import { Product } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'
import { Lang } from '@/utilities/lang'

import { Button } from './ui/button'

export function INTERNAL_ProductCardAddToCart({
	priceRange,
	variants,
	product,
	locale,
}: {
	priceRange?: string | null
	variants: Product['variants']
	product: {
		id: Product['id']
		title: Product['title']
	}
	locale: Lang
}): React.JSX.Element {
	const validVariant = findValidProductVariant(variants)
	const { loadProduct } = useCartManager({
		syncWithLocalStorage: true,
		showNotification: true,
		locale,
	})

	return (
		<Button
			hideArrow={true}
			className="group flex size-12 items-center justify-center rounded-[0.5rem] border-[#E7B27E] bg-[#E7B27E] p-0 transition-all hover:border hover:bg-transparent"
			title="Thêm vào giỏ hàng"
			disabled={!priceRange}
			onClick={() => {
				if (validVariant)
					loadProduct({
						product,
						variant: validVariant,
						quantity: 1,
						checked: true,
						disabled: false,
					})
			}}
		>
			<CirclePlus className="w-full transition-colors group-hover:text-[#E7B27E]" />
		</Button>
	)
}
