import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'
import { getTranslations } from 'next-intl/server'

import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Lang } from '@/i18n/routing'
import type { CallToActionRightBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600'] })

export async function CallToActionRightBlock(
	props: CallToActionRightBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.callToActionRight' })

	return (
		<div className="safe-width my-6 flex justify-between gap-10 bg-background max-lg:flex-col-reverse lg:my-16 lg:gap-24">
			<Button
				className="flex w-full items-center justify-between gap-2 lg:hidden"
				variant="outline"
				size="lg"
				asChild
			>
				<CMSLink
					{...props.link}
					type={props.link.type ?? undefined}
					label={props.link.label ?? t('buttonLabel')}
				>
					<ArrowRight />
				</CMSLink>
			</Button>

			<Carousel opts={{ dragFree: true }} className="place-self-center lg:mb-16">
				<CarouselContent>
					{props.gallery?.map((item, idx) => {
						return (
							<CarouselItem
								className="max-w-fit"
								key={item.id ?? `${idx}-${item.title}`}
							>
								<HeadlessImage
									media={item.image}
									alt={t('productImageAlt', { title: item.title ?? '' })}
									placeholder={{ width: 380, height: 460 }}
									className="mb-4 h-[28.75rem] w-[23.75rem] rounded-[0.5rem] object-cover"
								/>
								<div
									className={cn(
										'text-balance text-center text-2xl',
										phudu.className,
									)}
								>
									{item.title}
								</div>
							</CarouselItem>
						)
					})}
				</CarouselContent>
			</Carousel>

			<div className="box-content flex max-w-[28rem] flex-col gap-6 self-center lg:self-end">
				<div className="lg:leading -mb-8 whitespace-pre-wrap font-serif font-semibold italic text-primary max-lg:text-[2.5rem] lg:text-7xl lg:leading-[5rem]">
					{props['sub-title']}
				</div>
				<div
					className={cn(
						'lg:leading whitespace-pre-wrap font-serif font-semibold text-primary max-lg:text-[2.5rem] max-lg:lowercase max-lg:italic lg:text-7xl lg:leading-[5rem]',
						`lg:${phudu.className}`,
					)}
				>
					{props.title}
				</div>

				{/* only on large screen */}
				{props.description && (
					<RichText
						data={props.description}
						enableGutter={false}
						className="text-balance text-xl leading-8 text-primary opacity-60 max-lg:hidden"
						locale={props.locale}
					/>
				)}
				<Button
					className="flex w-full items-center justify-between gap-2 max-lg:hidden"
					variant="outline"
					size="lg"
					asChild
				>
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
	)
}
