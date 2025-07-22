import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { Lang } from '@/utilities/lang'

interface ValidMedia {
	url: string
	width: number
	height: number
	alt: string
}

export function LowImpactHero(
	props: Page['hero'] & {
		__locale: Lang
	},
): React.JSX.Element {
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
				{props.title && (
					<h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">{props.title}</h1>
				)}
				{props.subtitle && (
					<h2 className="mb-4 text-2xl font-bold md:text-4xl lg:text-5xl">{props.subtitle}</h2>
				)}
				{props.description && (
					<RichText data={props.description} enableGutter={false} locale={props.__locale} />
				)}
			</div>
			<ArrowDown color="#485A1E" size={30} />
		</div>
	)
}
