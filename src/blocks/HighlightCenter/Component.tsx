import { Phudu } from 'next/font/google'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { HighlightCenterBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

export function HighlightCenterBlock(
	props: HighlightCenterBlockProps & {
		__locale: Lang
	},
): React.JSX.Element {
	return (
		<div className="safe-width my-28 flex flex-col text-primary max-md:max-w-md">
			<div className="flex w-full flex-col items-center justify-center">
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'Highlight center image',
						[Lang.Vietnamese]: 'Hình ảnh nổi bật ở giữa',
					})(props.__locale)}
					placeholder={{ width: 600, height: 600 }}
					className="aspect-square size-[9.75rem] overflow-hidden rounded-full object-cover md:size-[32.75rem]"
				/>
				<div className={cn('relative mt-9 text-base md:mt-28 md:text-5xl', phudu.className)}>
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-4.5rem] h-16 w-[2px] -translate-x-1/2 bg-primary md:top-[-13.5rem] md:h-[13rem]" />
				</div>
				<div className="my-1 text-center font-serif text-base italic md:my-4 md:text-[2rem]">
					{props.title}
				</div>
			</div>
			<p className="text-balance text-center text-base md:text-2xl md:leading-tight lg:text-[2rem]">
				{props.description}
			</p>
		</div>
	)
}
