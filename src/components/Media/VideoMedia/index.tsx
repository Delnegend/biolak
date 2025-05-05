'use client'

import React, { useEffect, useRef } from 'react'

import { getClientSideURL } from '@/utilities/getURL'

import type { Props as MediaProps } from '../types'

export function VideoMedia(props: MediaProps): React.JSX.Element {
	const videoRef = useRef<HTMLVideoElement>(null)
	// const [showFallback] = useState<boolean>()

	useEffect(() => {
		const { current: video } = videoRef
		if (video) {
			video.addEventListener('suspend', () => {
				// setShowFallback(true);
				// console.warn('Video was suspended, rendering fallback image.')
			})
		}
	}, [])

	if (props.resource && typeof props.resource === 'object') {
		const { filename } = props.resource

		return (
			<video
				autoPlay
				className={props.videoClassName}
				controls={false}
				loop
				muted
				onClick={props.onClick}
				playsInline
				ref={videoRef}
			>
				<source src={`${getClientSideURL()}/media/${filename}`} />
			</video>
		)
	}

	return <></>
}
