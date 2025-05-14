import { Lato, Phudu } from 'next/font/google'
import Image from 'next/image'

import { HighlightCenterBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '400',
})

const lato = Lato({
	subsets: ['latin'],
	weight: '400',
})

export function HighlightCenterBlock(props: HighlightCenterBlockProps): React.JSX.Element {
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-28 flex flex-col text-primary">
			<div className="flex w-full flex-col items-center justify-center">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					alt={img?.alt ?? 'Placeholder'}
					unoptimized={img === null}
					className="aspect-square w-[32.75rem] overflow-hidden rounded-full object-cover"
				/>
				<div className={cn('relative mt-28 text-5xl', phudu.className)}>
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-13.5rem] h-[13rem] w-[2px] -translate-x-1/2 bg-primary" />
				</div>
				<div className="my-4 text-center font-serif text-[2rem] italic">{props.title}</div>
			</div>
			<p className={cn('text-balance text-center text-[2rem]', lato.className)}>
				{props.description}
			</p>
		</div>
	)
}
