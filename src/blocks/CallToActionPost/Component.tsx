import { Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CallToActionPostBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const lato = Lato({
	subsets: ['latin'],
	weight: ['400', '700'],
})

export function CallToActionPostBlock(props: CallToActionPostBlockProps): React.JSX.Element {
	const post = props.post && typeof props.post === 'object' ? props.post : null

	const img = post?.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null

	return (
		<div className="flex h-full flex-row max-lg:flex-col">
			<div className="flex w-full flex-col gap-[3.75rem] px-[6.125rem] py-[7.125rem] lg:max-w-[36rem]">
				<div className="font-serif text-[4rem] font-semibold leading-none">
					{props.overwriteTitle ?? post?.title}
				</div>
				<div className={cn('text-xl font-semibold', lato.className)}>
					{props.overwriteDescription ?? post?.meta?.description}
				</div>
				<Link href={post?.slug ? `/posts/${post.slug}` : '#'} className="w-full">
					<Button size="lg">{props.buttonLabel}</Button>
				</Link>
			</div>
			<div className="w-full lg:relative">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					alt={img?.alt ?? ''}
					unoptimized={img === null}
					className="size-full object-cover max-lg:aspect-square lg:absolute"
				/>
			</div>
		</div>
	)
}
