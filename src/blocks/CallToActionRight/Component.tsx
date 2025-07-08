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
					label={props.link.label ?? defaults.buttonLabel(props.__locale)}
				>
					<ArrowRight />
				</CMSLink>
			</Button>

			<Carousel opts={{ dragFree: true }} className="place-self-center lg:mb-16">
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
						label={props.link.label ?? defaults.buttonLabel(props.__locale)}
					>
						<ArrowRight />
					</CMSLink>
				</Button>
			</div>
		</div>
	)
}
