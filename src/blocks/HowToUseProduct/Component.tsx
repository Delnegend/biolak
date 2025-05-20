import Image from 'next/image'

import RichText from '@/components/RichText'
import { HowToUseProductBlockProps } from '@/payload-types'

export function HowToUseProductBlockComponent(props: HowToUseProductBlockProps): React.JSX.Element {
	const img = typeof props.image === 'object' ? props.image : null

	return (
		<div className="relative grid min-h-[50dvw] grid-cols-2">
			<div />
			<div className="absolute inset-0 z-0">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					alt={img?.alt ?? 'Product Image'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					unoptimized={!img}
					className="h-full w-1/2 overflow-hidden object-cover"
				/>
			</div>
			<div className='text-primary" flex size-full flex-col justify-center p-[7rem]'>
				<div className="text-xl font-medium">{props.subtitle}</div>
				<div className="mb-4 mt-1 font-serif text-5xl font-medium">{props.title}</div>
				<RichText className="compact" data={props.content} enableGutter={false} />
			</div>
		</div>
	)
}
