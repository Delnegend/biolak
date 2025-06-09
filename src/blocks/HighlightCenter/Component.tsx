import { Phudu } from 'next/font/google'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { HighlightCenterBlockProps } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

export async function HighlightCenterBlock(
	props: HighlightCenterBlockProps,
): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	return (
		<div className="safe-width my-28 flex flex-col text-primary">
			<div className="flex w-full flex-col items-center justify-center">
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'Highlight center image',
						[Lang.Vietnamese]: 'Hình ảnh nổi bật ở giữa',
					})(locale)}
					placeholder={{ width: 600, height: 600 }}
					className="aspect-square w-[32.75rem] overflow-hidden rounded-full object-cover"
				/>
				<div className={cn('relative mt-28 text-5xl', phudu.className)}>
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-13.5rem] h-[13rem] w-[2px] -translate-x-1/2 bg-primary" />
				</div>
				<div className="my-4 text-center font-serif text-[2rem] italic">{props.title}</div>
			</div>
			<p className="text-balance text-center text-[2rem]">{props.description}</p>
		</div>
	)
}
