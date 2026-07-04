import { Phudu } from 'next/font/google'
import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Lang } from '@/i18n/routing'
import { HighlightLeftBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

export async function HighlightLeftBlock(
	props: HighlightLeftBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.highlightLeft' })

	return (
		<div className="safe-width my-28 grid grid-cols-[5.625rem_1fr] gap-12 text-primary max-md:max-w-md md:grid-cols-[25rem_1fr] md:gap-20 lg:gap-28">
			<div>
				<HeadlessImage
					media={props.image}
					alt={t('alt')}
					className="aspect-square size-[5.625rem] overflow-hidden rounded-full object-cover md:size-[25rem]"
				/>{' '}
				<div
					className={cn(
						'relative mt-9 text-center text-base md:mt-28 md:text-5xl',
						phudu.className,
					)}
				>
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-4.5rem] h-16 w-[2px] -translate-x-1/2 bg-primary md:top-[-13.5rem] md:h-[13rem]" />
				</div>
			</div>

			<div className="gap-12 self-center">
				<div className="mb-1 font-serif text-base italic md:mb-10 md:text-[2rem]">
					{props.title}
				</div>
				<div className="text-balance text-base md:text-2xl md:leading-tight lg:text-[2rem]">
					{props.description}
				</div>
			</div>
		</div>
	)
}
