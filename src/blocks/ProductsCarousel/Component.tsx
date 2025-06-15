import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'
import Link from 'next/link'

import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { ProductsCarouselBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { ProductsCarouselBlockDefaults as defaults } from './defaults'
import { ProductsCarouselNavButton } from './ProductsCarouselNavButton'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '500',
})

export async function ProductsCarouselBlock(
	props: ProductsCarouselBlockProps & {
		__lang?: Lang
	},
): Promise<React.JSX.Element> {
	const products = props.products?.filter((p) => typeof p === 'object') ?? []

	return (
		<div className="relative max-h-[55rem] overflow-hidden">
			{products && products.length > 0 && (
				<Carousel opts={{ loop: true }}>
					<CarouselContent>
						{products.map((product) => {
							const img =
								product.gallery &&
								product.gallery[0] &&
								typeof product.gallery[0] === 'object'
									? product.gallery[0]
									: undefined
							return (
								<CarouselItem key={product.id} className="grid grid-cols-2">
									<HeadlessImage
										media={product.gallery?.[0]}
										alt={
											img?.alt ??
											product.title ??
											matchLang({
												[Lang.English]: 'Product Image',
												[Lang.Vietnamese]: 'Hình ảnh sản phẩm',
											})(props.__lang)
										}
										placeholder={{ width: 720, height: 880 }}
										className="size-full max-h-[55rem] object-cover"
									/>
									<div className="flex flex-col justify-center gap-3 text-balance bg-[#210E0A] px-14 text-[#F1DAAE]">
										<div className="text-xl font-medium">
											{props.title ?? defaults.title(props.__lang)}
										</div>
										<div className="font-serif text-7xl font-bold">{product.title}</div>
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
													defaults.watchMoreBtnLabel(props.__lang)}
												<ArrowRight />
											</Link>
										</Button>

										<div className="my-3 flex flex-row gap-3">
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
												'text-xl font-medium text-[#FFF9ED]',
												phudu.className,
											)}
											{...props.apb}
											type={props.apb?.type ?? undefined}
											label={defaults.allProductsBtnLabel(props.__lang)}
										/>
									</div>
								</CarouselItem>
							)
						})}
					</CarouselContent>
					<ProductsCarouselNavButton
						direction="previous"
						className="absolute left-0 top-1/2"
					/>
					<ProductsCarouselNavButton direction="next" className="absolute right-0 top-1/2" />
				</Carousel>
			)}
		</div>
	)
}
