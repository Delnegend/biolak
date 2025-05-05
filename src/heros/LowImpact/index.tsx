import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'

interface ValidMedia {
	url: string
	width: number
	height: number
	alt: string
}

export function LowImpactHero(props: Page['hero']): React.JSX.Element {
	let media: ValidMedia | undefined
	if (
		props.media !== undefined &&
		typeof props.media === 'object' &&
		props.media !== null &&
		props.media.url &&
		props.media.width &&
		props.media.height
	) {
		media = {
			url: props.media.url,
			width: props.media.width,
			height: props.media.height,
			alt: props.media.alt ?? '',
		}
	}

	return (
		<div className="container my-16 flex h-[22.5rem] flex-col items-center justify-center gap-11">
			{media && (
				<Image src={media.url} alt={media.alt} width={media.width} height={media.height} />
			)}
			<div className="max-w-3xl text-center">
				{richText && <RichText data={richText} enableGutter={false} />}
			</div>
			<ArrowDown color="#485A1E" size={30} />
		</div>
	)
}
