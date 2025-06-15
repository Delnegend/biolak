import React from 'react'

import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BestSellerBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { cn } from '@/utilities/ui'

import { BestSellerBlockDefaults as defaults } from './defaults'

export function BestSellerBlock(
	props: BestSellerBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	const products =
		props.products && props.products.length > 0
			? props.products.filter((p) => p !== null && typeof p === 'object')
			: []

	return (
		<div className="safe-width flex h-[48rem]">
			<div className="flex h-full w-[40rem] flex-col justify-end gap-9 py-24 pr-16">
				<div
					className={cn(
						'font-serif text-7xl font-semibold italic leading-[3.5rem] text-primary',
					)}
				>
					{props.title ?? defaults.title(props.__locale)}
				</div>
				{props.description && <div className={cn('text-balance')}>{props.description}</div>}
			</div>

			<Carousel opts={{ dragFree: true }} className="py-24">
				<CarouselContent>
					{products.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
