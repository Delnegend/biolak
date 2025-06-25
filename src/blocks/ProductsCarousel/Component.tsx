import config from '@payload-config'
import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'
import Link from 'next/link'
import { getPayload } from 'payload'

import { MediaSlug } from '@/collections/Media/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { ProductsCarouselBlockProps } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { arrayDepthHandler, depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { ProductsCarouselBlockDefaults as defaults } from './defaults'
import { ProductsCarouselNavButton } from './ProductsCarouselNavButton'

const cnsole = cnsoleBuilder('blocks/ProductsCarousel')

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '500',
})

export async function ProductsCarouselBlock(
	props: ProductsCarouselBlockProps & {
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
				})
				.then((res) => res.docs),
	})
	if (!productsOk) {
		cnsole.error("Can't fetching products:", productsError)
	}

	return (
		<div className="relative overflow-hidden">
			{products && products.length > 0 && (
				<Carousel opts={{ loop: true }}>
					<CarouselContent>
						{products.map(async (product) => {
							const {
								data: img,
								ok,
								error,
							} = await depthHandler({
								data: product.gallery?.[0],
								fetch: async (id) =>
									(await getPayload({ config })).findByID({
										collection: MediaSlug,
										id,
									}),
							})
							if (!ok) {
								cnsole.error(`Can't fetching image for product ${product.id}:`, error)
							}
							return (
								<CarouselItem
									key={product.id}
									className="grid max-md:grid-rows-[auto_auto] md:grid-cols-[3fr_4fr] xl:grid-cols-2"
								>
									<HeadlessImage
										media={product.gallery?.[0]}
										alt={
											img?.alt ??
											product.title ??
											matchLang({
												[Lang.English]: 'Product Image',
												[Lang.Vietnamese]: 'Hình ảnh sản phẩm',
											})(props.__locale)
										}
										placeholder={{ width: 720, height: 880 }}
										className="size-full max-h-[55rem] object-cover"
									/>
									<div className="flex flex-col justify-center gap-3 text-balance bg-[#210E0A] px-14 py-12 text-[#F1DAAE] max-md:h-fit max-md:px-4 max-md:py-6">
										<div className="text-xl font-medium max-md:text-base">
											{props.title ?? defaults.title(props.__locale)}
										</div>
										<div className="font-serif text-7xl font-bold max-md:text-[2.5rem]">
											{product.title}
										</div>
										<div className="my-5">{product.shortDescription}</div>

										<Button
											size="lg"
											className="w-full max-w-[26rem] justify-between"
											asChild
										>
											<Link
												href="/[slug]"
												as={product.slug ? `/product/${product.slug}` : '#'}
											>
												{props.watchMoreBtnLabel ??
													defaults.watchMoreBtnLabel(props.__locale)}
												<ArrowRight />
											</Link>
										</Button>

										<div className="mt-3 flex flex-row gap-3">
											{products.map((pDot, index) => (
												<svg
													key={`${pDot.id}-${index}`}
													width="10"
													height="11"
													viewBox="0 0 10 11"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle
														opacity={pDot.id === product.id ? '0.8' : '0.4'}
														cx="5"
														cy="5.16602"
														r="5"
														fill="white"
													/>
												</svg>
											))}
										</div>

										<CMSLink
											className={cn(
												'text-xl font-medium text-[#FFF9ED] max-md:hidden',
												phudu.className,
											)}
											{...props.apb}
											type={props.apb?.type ?? undefined}
											label={
												props.apb.label ?? defaults.allProductsBtnLabel(props.__locale)
											}
										/>
									</div>
								</CarouselItem>
							)
						})}
					</CarouselContent>
					<ProductsCarouselNavButton
						direction="previous"
						className="absolute left-0 top-1/2 max-md:hidden"
					/>
					<ProductsCarouselNavButton
						direction="next"
						className="absolute right-0 top-1/2 max-md:hidden"
					/>
				</Carousel>
			)}
		</div>
	)
}
