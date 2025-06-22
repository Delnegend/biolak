import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BestSellerBlockProps } from '@/payload-types'
import { arrayDepthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { cn } from '@/utilities/ui'

import { BestSellerBlockDefaults as defaults } from './defaults'

export async function BestSellerBlock(
	props: BestSellerBlockProps & {
		__locale?: Lang
	},
): Promise<React.JSX.Element> {
	const payload = await getPayload({ config })
	const {
		data: products,
		ok: productsOk,
		error: productsError,
	} = await arrayDepthHandler({
		data: props.products,
		fetch: async (ids) =>
			payload
				.find({
					collection: ProductsSlug,
					where: {
						id: {
							in: ids,
						},
					},
					pagination: false,
					limit: 20,
				})
				.then((res) => res.docs),
	})
	if (!productsOk) {
		console.error(`[Block/BestSeller] Error fetching products: ${productsError}`)
	}

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
					{products?.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
