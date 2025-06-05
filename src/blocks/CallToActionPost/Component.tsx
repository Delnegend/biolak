import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { CMSLink } from '@/components/CMSLink'
import { Button } from '@/components/ui/button'
import { CallToActionPostBlockProps } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { CallToActionPostBlockDefaults as defaults } from './defaults'

export async function CallToActionPostBlock(
	props: CallToActionPostBlockProps,
): Promise<React.JSX.Element> {
	const post = props.post && typeof props.post === 'object' ? props.post : null
	const locale = await getClientLang()

	const img = post?.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null

	return (
		<div className="flex h-full flex-row max-lg:flex-col">
			<div className="flex w-full flex-col gap-[3.75rem] px-[6.125rem] py-[7.125rem] lg:max-w-[36rem]">
				<div className="font-serif text-[4rem] font-semibold leading-none">
					{props.overwriteTitle ?? post?.title}
				</div>
				<div className="text-xl font-semibold">
					{props.overwriteDescription ?? post?.meta?.meta?.description}
				</div>
				<Button size="lg" className="justify-between" asChild disabled={!props.link}>
					<CMSLink
						{...props.link}
						type={props.link?.type ?? undefined}
						label={props.link?.label ?? defaults.buttonLabel(locale)}
					>
						<ArrowRight />
					</CMSLink>
				</Button>
			</div>
			<div className="w-full lg:relative">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					alt={
						img?.alt ??
						matchLang({
							[Lang.English]: 'Post hero image',
							[Lang.Vietnamese]: 'Hình ảnh bài viết',
						})(locale)
					}
					unoptimized={!img}
					className="size-full object-cover max-lg:aspect-square lg:absolute"
				/>
			</div>
		</div>
	)
}
