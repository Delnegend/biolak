import { Phudu } from 'next/font/google'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { HighlightLeftBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

export function HighlightLeftBlock(
	props: HighlightLeftBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	return (
		<div className="safe-width my-28 grid grid-cols-[5.625rem_1fr] gap-12 text-primary max-md:max-w-md md:grid-cols-[25rem_1fr] md:gap-20 lg:gap-28">
			<div>
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'Highlight left image',
						[Lang.Vietnamese]: 'Hình ảnh nổi bật bên trái',
					})(props.__locale)}
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
					{' '}
					{props.title}
				</div>
				<div className="text-balance text-base md:text-[2rem] md:leading-tight">
					{props.description}
				</div>
			</div>
		</div>
	)
}
