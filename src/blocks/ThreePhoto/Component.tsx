import Image from 'next/image'

import type { ThreePhotoBlockProps } from '@/payload-types'

export function ThreePhotoBlock(props: ThreePhotoBlockProps): React.JSX.Element {
	const photoLeft = typeof props.photoLeft === 'object' ? props.photoLeft : null
	const photoRight = typeof props.photoRight === 'object' ? props.photoRight : null
	const photoCenter = typeof props.photoCenter === 'object' ? props.photoCenter : null

	return (
		<div className="mx-auto my-28 grid w-4/5 max-w-7xl grid-cols-[290fr_620fr_290fr] gap-x-10">
			<Image
				className="place-self-center"
				src={photoLeft?.url ?? 'https://placehold.co/290x442'}
				alt={photoLeft?.alt ?? 'Left Photo'}
				width={photoLeft?.width ?? 290}
				height={photoLeft?.height ?? 442}
				unoptimized={!photoLeft}
			/>
			<Image
				className="place-self-center"
				src={photoCenter?.url ?? 'https://placehold.co/620x725'}
				alt={photoCenter?.alt ?? 'Center Photo'}
				width={photoCenter?.width ?? 620}
				height={photoCenter?.height ?? 725}
				unoptimized={!photoCenter}
			/>
			<Image
				className="place-self-center"
				src={photoRight?.url ?? 'https://placehold.co/290x442'}
				alt={photoRight?.alt ?? 'Right Photo'}
				width={photoRight?.width ?? 290}
				height={photoRight?.height ?? 442}
				unoptimized={!photoRight}
			/>
		</div>
	)
}
