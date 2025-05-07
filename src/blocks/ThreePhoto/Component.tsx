import Image from 'next/image'

import type { ThreePhotoBlockProps } from '@/payload-types'

export function ThreePhotoBlock(props: ThreePhotoBlockProps): React.JSX.Element {
	const photoLeft = typeof props.photoLeft === 'object' ? props.photoLeft : null
	const photoRight = typeof props.photoRight === 'object' ? props.photoRight : null
	const photoCenter = typeof props.photoCenter === 'object' ? props.photoCenter : null

	return (
		<div className="mx-auto grid w-4/5 max-w-7xl grid-cols-[290fr_620fr_290fr] gap-x-10">
			<Image
				className="place-self-center"
				src={photoLeft?.url ?? 'https://placehold.co/1000x1000'}
				alt={photoLeft?.alt ?? 'Left Photo'}
				width={photoLeft?.width ?? 1000}
				height={photoLeft?.height ?? 1000}
				unoptimized={photoLeft === null}
			/>
			<Image
				className="place-self-center"
				src={photoCenter?.url ?? 'https://placehold.co/1000x1000'}
				alt={photoCenter?.alt ?? 'Center Photo'}
				width={photoCenter?.width ?? 1000}
				height={photoCenter?.height ?? 1000}
			/>
			<Image
				className="place-self-center"
				src={photoRight?.url ?? 'https://placehold.co/1000x1000'}
				alt={photoRight?.alt ?? 'Right Photo'}
				width={photoRight?.width ?? 1000}
				height={photoRight?.height ?? 1000}
			/>
		</div>
	)
}
