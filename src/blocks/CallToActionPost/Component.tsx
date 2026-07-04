import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { Lang } from '@/i18n/routing'
import { CallToActionPostBlockProps } from '@/payload-types'

export async function CallToActionPostBlock(
	props: CallToActionPostBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.callToActionPost' })
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
						label={props.link?.label ?? t('buttonLabel')}
					>
						<ArrowRight />
					</CMSLink>
				</Button>
			</div>
			<div className="w-full lg:relative">
				<HeadlessImage
					media={post?.meta?.meta?.image}
					placeholder={{ width: 1000, height: 1000 }}
					alt={t('postImageAlt')}
					className="size-full object-cover max-lg:aspect-square lg:absolute"
				/>
			</div>
		</div>
	)
}
