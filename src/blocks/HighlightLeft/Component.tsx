import { Lato } from 'next/font/google'
import Image from 'next/image'

import { HighlightLeftBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const lato = Lato({
	weight: '400',
})

export function HighlightLeftBlock(props: HighlightLeftBlockProps): React.JSX.Element {
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-[7rem] grid grid-cols-[25rem_1fr] gap-[7rem] text-primary">
			<div>
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					alt={img?.alt ?? 'Placeholder'}
					unoptimized={img === null}
					className="aspect-square size-[25rem] overflow-hidden rounded-full object-cover"
				/>
				<div className="relative mt-28 text-center text-5xl">
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-13.5rem] h-[13rem] w-[2px] -translate-x-1/2 bg-primary" />
				</div>
			</div>

			<div className="self-center">
				<div className="mb-[2.5rem] font-serif text-[2rem] italic"> {props.title}</div>
				<div className={cn('text-balance text-[2rem]', lato.className)}>
					{props.description}
				</div>
			</div>
		</div>
	)
}
