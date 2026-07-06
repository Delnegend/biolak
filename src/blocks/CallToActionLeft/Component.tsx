import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { CMSLink } from '@/components/CMSLink'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Lang } from '@/i18n/routing'
import type { CallToActionLeftBlockProps } from '@/payload-types'

export async function CallToActionLeftBlock(
	props: CallToActionLeftBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.callToActionLeft' })
	const bgUrl =
		props.background && typeof props.background === 'object' && props.background.url
			? props.background.url
			: 'https://placehold.co/1920x1080'

	return (
		<div
			style={{
				backgroundImage: `url(${bgUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="safe-width">
				<div className="box-content flex max-w-[28rem] flex-col gap-6 py-24 pr-24">
					<div className="leading whitespace-pre-wrap font-serif text-8xl font-bold leading-[5rem] text-white">
						{props.title}
					</div>
					{props.description && (
						<RichText
							data={props.description}
							enableGutter={false}
							className="mx-0 text-balance text-xl leading-8 text-white"
							locale={props.locale}
						/>
					)}
					<Button className="w-full justify-between" size="lg" asChild>
						<CMSLink
							{...props.link}
							type={props.link.type ?? undefined}
							label={props.link.label ?? t('buttonLabel')}
						>
							<ArrowRight />
						</CMSLink>
					</Button>
				</div>
			</div>
		</div>
	)
}
