import { Phudu } from 'next/font/google'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { HighlightRightBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

export function HighlightRightBlock(
	props: HighlightRightBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	return (
		<div className="safe-width my-28 grid grid-cols-[1fr_5.625rem] gap-12 text-primary max-md:max-w-md md:grid-cols-[1fr_25rem] md:gap-12 lg:gap-20">
			<div>
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'Highlight right image',
						[Lang.Vietnamese]: 'Hình ảnh nổi bật bên phải',
					})(props.__locale)}
					className="aspect-square size-[5.625rem] justify-self-end overflow-hidden rounded-full object-cover md:size-[25rem]"
				/>
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

			<div className="-order-1 self-center text-base md:text-[2rem]">
				<div className="mb-1 font-serif italic md:mb-10"> {props.title}</div>
				<div className="text-balance">{props.description}</div>
			</div>
		</div>
	)
}
