import { Phudu } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { ProductsCarouselBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { ProductsCarouselNavButton } from './ProductsCarouselNavButton'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '500',
})

export function ProductsCarouselBlock(props: ProductsCarouselBlockProps): React.JSX.Element {
	const products = props.products?.filter((p) => typeof p === 'object') ?? []

	return (
		<div className="relative max-h-[55rem] overflow-hidden">
			{products && products.length > 0 && (
				<Carousel opts={{ loop: true }}>
					<CarouselContent>
						{products.map((p) => {
							const img =
								p.gallery && p.gallery[0] && typeof p.gallery[0] === 'object'
									? p.gallery[0]
									: undefined
							return (
								<CarouselItem key={p.id} className="grid grid-cols-2">
									<Image
										src={img?.url ?? 'https://placehold.co/720x880'}
										alt={img?.alt ?? 'Product Image'}
										width={img?.width ?? 720}
										height={img?.height ?? 880}
										className="size-full max-h-[55rem] object-cover"
										unoptimized={img?.url === undefined}
									/>
									<div className="flex flex-col justify-center gap-3 text-balance bg-[#210E0A] px-14 text-[#F1DAAE]">
										<div className="text-xl font-medium">{props.title}</div>
										<div className="font-serif text-7xl font-bold">{p.title}</div>
										{p.longDescription ? (
											<RichText
												className="my-5"
												data={p.longDescription}
												enableGutter={false}
											/>
										) : (
											<div className="my-5">{p.shortDescription}</div>
										)}

										<Link href="/[slug]" as={p.slug ? `/product/${p.slug}` : '#'}>
											<Button size="lg" className="w-[26rem]">
												{props.watchMoreBtnLabel}
											</Button>
										</Link>

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
														opacity={pDot.id === p.id ? '0.8' : '0.4'}
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
											type={props.apb.type ?? undefined}
										>
											{props.apb.label}&nbsp;→
										</CMSLink>
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
