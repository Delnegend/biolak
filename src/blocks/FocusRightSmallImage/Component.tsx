import Image from 'next/image'

import RichText from '@/components/RichText'
import { FocusRightSmallImageBlockProps } from '@/payload-types'

export function FocusRightSmallImageBlock(
	props: FocusRightSmallImageBlockProps,
): React.JSX.Element {
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-24 grid grid-cols-[3.5fr_3fr]">
			<RichText data={props.content} enableGutter={false} className="self-center text-primary" />
			<Image
				src={img?.url ?? 'https://placehold.co/1000x1000'}
				alt={img?.alt ?? 'Placeholder'}
				width={img?.width ?? 1000}
				height={img?.height ?? 1000}
				unoptimized={!img}
				className="size-full max-h-[45rem] max-w-[30rem] place-self-end self-center object-cover pl-11"
			/>
		</div>
	)
}
