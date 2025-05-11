import Image from 'next/image'

import RichText from '@/components/RichText'
import { FocusLeftSmallImageBlockProps } from '@/payload-types'

export function FocusLeftSmallImageBlock(props: FocusLeftSmallImageBlockProps): React.JSX.Element {
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-24 grid grid-cols-[3fr_3.5fr]">
			<Image
				src={img?.url ?? 'https://placehold.co/1000x1000'}
				alt={img?.alt ?? 'Placeholder'}
				width={img?.width ?? 1000}
				height={img?.height ?? 1000}
				unoptimized={img === null}
				className="size-full max-h-[35rem] max-w-[23rem] self-center object-cover px-11"
			/>
			<RichText data={props.content} enableGutter={false} className="self-center text-primary" />
		</div>
	)
}
