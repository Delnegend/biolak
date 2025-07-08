import config from '@payload-config'
import { Phudu } from 'next/font/google'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { CMSLink } from '@/components/CMSLink'
import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BestSellerBlockProps } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { arrayDepthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { cn } from '@/utilities/ui'

import { BestSellerBlockDefaults as defaults } from './defaults'

const cnsole = cnsoleBuilder('blocks/BestSeller')

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '500',
})

export async function BestSellerBlock({
	__locale,
	...props
}: BestSellerBlockProps & {
	__locale?: Lang
}): Promise<React.JSX.Element> {
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
		cnsole.error("Can't fetching products:", productsError)
	}

	return (
		<div className="safe-width my-[2.5rem] flex flex-col items-center gap-[2.5rem] lg:my-24 lg:flex-row lg:items-end lg:gap-16">
			<div className="flex h-full flex-col justify-end lg:max-w-[40rem] lg:gap-9">
				<div className="font-serif text-[2.5rem] font-semibold italic leading-[3.5rem] text-primary lg:text-7xl">
					{props.title ?? defaults.title(__locale)}
				</div>
				{props.description && (
					<div className="text-balance text-primary opacity-60 max-lg:hidden">
						{props.description}
					</div>
				)}
				<CMSLink
					{...props.link}
					type={props.link?.type ?? undefined}
					label={props.link?.label ?? defaults.viewAllProductsButton(__locale)}
					className={cn(
						'text-xl font-medium leading-8 text-[#703D00] max-lg:hidden',
						phudu.className,
					)}
				/>
			</div>

			<Carousel opts={{ dragFree: true }} className="max-lg:w-full">
				<CarouselContent>
					{products?.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
