import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { LatestPostsBlockProps } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { LatestPostsBlockDefaults as defaults } from './defaults'

export async function LatestPostsBlock(props: LatestPostsBlockProps): Promise<React.JSX.Element> {
	const posts = props.posts.filter((post) => typeof post === 'object') ?? []
	const locale = await getClientLang()

	return (
		<div className="border-t py-14">
			<div className="safe-width">
				<div className="mb-12 flex flex-row items-center justify-between font-semibold italic">
					<div className="font-serif text-7xl">{props.title ?? defaults.title(locale)}</div>
					<Button size="lg" className="justify-between" variant="outline" asChild>
						<Link href={'/events'}>
							{props.buttonLabel ?? defaults.buttonLabel(locale)}
							<ArrowRight />
						</Link>
					</Button>
				</div>

				<Carousel opts={{ dragFree: true }}>
					<CarouselContent className="gap-12">
						{posts.map((post, index) => {
							const author = typeof post.authors?.[0] === 'object' ? post.authors[0] : null
							const lastModified =
								typeof post.updatedAt === 'string' ? new Date(post.updatedAt) : new Date()
							const lastModifiedStr = `${lastModified.getDate().toString().padStart(2, '0')}.${lastModified.getMonth().toString().padStart(2, '0')}.${lastModified.getFullYear().toString().slice(2)}`

							return (
								<Link href={`/post/${post.slug}`} key={index}>
									<CarouselItem key={index} className="max-w-[25rem]">
										<HeadlessImage
											media={post.meta?.meta?.image}
											alt={matchLang({
												[Lang.English]: 'Post hero image',
												[Lang.Vietnamese]: 'Hình ảnh bài viết',
											})(locale)}
											placeholder={{ width: 460, height: 400 }}
											className="h-[25rem] w-[28.75rem] rounded-[0.5rem] object-cover"
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
											{post.meta?.meta?.description && (
												<div className="text-xs">{post.meta.meta.description}</div>
											)}
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
