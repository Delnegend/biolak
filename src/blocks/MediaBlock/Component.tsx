import type { StaticImageData } from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import type { MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Media } from '../../components/Media'

export function MediaBlockComponent(
	props: MediaBlockProps & {
		breakout?: boolean
		captionClassName?: string
		className?: string
		enableGutter?: boolean
		imgClassName?: string
		staticImage?: StaticImageData
		disableInnerContainer?: boolean
	},
): React.JSX.Element {
	const caption = props.media && typeof props.media === 'object' ? props.media.caption : undefined

	return (
		<div
			className={cn(
				'',
				{
					container: props.enableGutter ?? true,
				},
				props.className,
			)}
		>
			{(props.media || props.staticImage) && (
				<Media
					imgClassName={cn('rounded-[0.8rem] border border-border', props.imgClassName)}
					resource={props.media}
					src={props.staticImage}
				/>
			)}
			{caption && (
				<div
					className={cn(
						'mt-6',
						{
							container: !props.disableInnerContainer,
						},
						props.captionClassName,
					)}
				>
					<RichText data={caption} enableGutter={false} />
				</div>
			)}
		</div>
	)
}
