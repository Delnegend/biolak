import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { LatestPostsBlockProps } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { AllPostsButton } from './AllPostsButton.client'

export function LatestPostsBlock(props: LatestPostsBlockProps): React.JSX.Element {
	const posts =
		props.posts
			?.map((p) => p !== null && p.post)
			.filter((p) => typeof p === 'object' && p !== null) || []

	return (
		<div className="border-t py-14">
			<div className="safe-width">
				<div className="mb-12 flex flex-row items-center justify-between font-semibold italic">
					<div className="font-serif text-7xl">{props.title}</div>
					<Link href={'/posts'} className="">
						<AllPostsButton buttonLabel={props.buttonLabel} />
					</Link>
				</div>

				<Carousel opts={{ dragFree: true }}>
					<CarouselContent className="gap-12">
						{posts.map((post, index) => {
							const img = typeof post.heroImage === 'object' ? post.heroImage : null
							const author = typeof post.authors?.[0] === 'object' ? post.authors[0] : null
							const lastModified =
								typeof post.updatedAt === 'string' ? new Date(post.updatedAt) : new Date()
							const lastModifiedStr = `${lastModified.getDate().toString().padStart(2, '0')}.${lastModified.getMonth().toString().padStart(2, '0')}.${lastModified.getFullYear().toString().slice(2)}`

							return (
								<Link href={`/posts/${post.slug}`} key={index}>
									<CarouselItem key={index} className="max-w-[25rem]">
										<Image
											src={img?.url || 'https://placehold.co/460x400'}
											alt={img?.alt || ''}
											width={img?.width || 0}
											height={img?.height || 0}
											className="h-[25rem] w-[28.75rem] rounded-[0.5rem] object-cover"
											unoptimized={img === null}
										/>

										<div className="my-6 text-primary">
											<div className="text-[0.625rem] font-medium">
												{author?.name ?? 'BioLAK'}
												&nbsp;|&nbsp;
												<span className="text-[#e7b27e]">{lastModifiedStr}</span>
											</div>
											<div className="font-serif text-2xl font-bold">
												{post.title}&nbsp;→
											</div>
											<div className="text-xs">
												{post.meta?.description ??
													'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in nisl aliquam, pharetra diam consequat, tincidunt nibh.'}
											</div>
										</div>
									</CarouselItem>
								</Link>
							)
						})}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	)
}
