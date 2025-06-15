import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'
import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { CallToActionRightBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { CallToActionRightBlockDefaults as defaults } from './defaults'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600'] })

export function CallToActionRightBlock(
	props: CallToActionRightBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	return (
		<div className="safe-width flex h-[48rem] justify-between bg-background">
			<Carousel opts={{ dragFree: true }} className="place-self-center">
				<CarouselContent>
					{props.gallery?.map((item, idx) => {
						return (
							<CarouselItem className="max-w-fit" key={item.id ?? `${idx}-${item.title}`}>
								<HeadlessImage
									media={item.image}
									alt={matchLang({
										[Lang.English]: `${item.title} product image`,
										[Lang.Vietnamese]: `Ảnh sản phẩm ${item.title}`,
									})(props.__locale)}
									placeholder={{ width: 380, height: 460 }}
									className="mb-4 h-[28.75rem] w-[23.75rem] rounded-[0.5rem] object-cover"
								/>
								<div className={cn('text-balance text-center text-2xl', phudu.className)}>
									{item.title}
								</div>
							</CarouselItem>
						)
					})}
				</CarouselContent>
			</Carousel>

			<div className="box-content flex max-w-[28rem] flex-col gap-6 self-end py-16 pl-24">
				<div className="leading -mb-8 whitespace-pre-wrap font-serif text-7xl font-semibold italic leading-[5rem] text-primary">
					{props['sub-title']}
				</div>
				<div
					className={cn(
						'leading whitespace-pre-wrap font-serif text-7xl font-semibold leading-[5rem] text-primary',
						phudu.className,
					)}
				>
					{props.title}
				</div>
				{props.description && (
					<RichText
						data={props.description}
						enableGutter={false}
						className="text-balance text-xl leading-8 text-primary"
					/>
				)}
				<Button
					className="flex w-full items-center justify-between gap-2"
					variant="outline"
					size="lg"
					asChild
				>
					<CMSLink
						{...props.link}
						type={props.link.type ?? undefined}
						label={props.link.label ?? defaults.buttonLabel(props.__locale)}
					>
						<ArrowRight />
					</CMSLink>
				</Button>
			</div>
		</div>
	)
}
