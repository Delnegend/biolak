import { ArrowRight } from 'lucide-react'

import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { CallToActionPostBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { CallToActionPostBlockDefaults as defaults } from './defaults'

export function CallToActionPostBlock(
	props: CallToActionPostBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	const post = props.post && typeof props.post === 'object' ? props.post : null

	const title = props.overwriteTitle ?? post?.title
	const description = props.overwriteDescription ?? post?.meta?.meta?.description

	return (
		<div className="flex h-full flex-row max-lg:flex-col">
			<div className="flex w-full flex-col gap-[3.75rem] px-[6.125rem] py-[7.125rem] lg:max-w-[36rem]">
				{title && (
					<div className="font-serif text-[4rem] font-semibold leading-none">{title}</div>
				)}
				{description && <div className="text-xl font-semibold">{description}</div>}
				<Button size="lg" className="justify-between" asChild disabled={!props.link}>
					<CMSLink
						{...props.link}
						type={props.link?.type ?? undefined}
						label={props.link?.label ?? defaults.buttonLabel(props.__locale)}
					>
						<ArrowRight />
					</CMSLink>
				</Button>
			</div>
			<div className="w-full lg:relative">
				<HeadlessImage
					media={post?.meta?.meta?.image}
					placeholder={{ width: 1000, height: 1000 }}
					alt={matchLang({
						[Lang.English]: 'Post hero image',
						[Lang.Vietnamese]: 'Hình ảnh bài viết',
					})(props.__locale)}
					className="size-full object-cover max-lg:aspect-square lg:absolute"
				/>
			</div>
		</div>
	)
}
