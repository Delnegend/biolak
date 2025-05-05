'use client'
import './style.scss'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Media } from '@/payload-types'

export function InfiniteScrollBlockCC(props: {
	graphic: Media
	animationDuration: number
}): React.JSX.Element {
	const containerRef = useRef<HTMLDivElement>(null)
	const [renderCount, setRenderCount] = useState(3)
	const [bannerProportion, setBannerProportion] = useState(100)

	function setRenderCountHelper(): void {
		const containerWidth = containerRef.current?.clientWidth
		const bannerWidth = props.graphic.width

		if (!containerWidth || containerWidth === 0 || !bannerWidth || bannerWidth === 0) return

		if (bannerWidth * renderCount < containerWidth + bannerWidth) {
			setRenderCount(Math.ceil(containerWidth / bannerWidth))
		}

		setBannerProportion(Math.round((bannerWidth / containerWidth) * 10000) / 100)
	}

	useEffect(() => {
		if (!containerRef.current) return

		const observer = new ResizeObserver(() => {
			setRenderCountHelper()
		})
		observer.observe(containerRef.current)

		setRenderCountHelper()

		return () => {
			observer.disconnect()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			ref={containerRef}
			className="flex h-48 items-center overflow-hidden"
			id="infinite-scroll-block"
			style={{
				// @ts-expect-error idc
				'--animation-duration': `${props.animationDuration}s`,
				'--banner-proportion': `-${bannerProportion}%`,
			}}
		>
			<div className="flex flex-row overflow-x-visible">
				{Array.from({ length: renderCount }).map((_, i) => (
					<Image
						key={i}
						src={props.graphic.url ?? ''}
						alt={props.graphic.alt ?? ''}
						width={props.graphic.width ?? 0}
						height={props.graphic.height ?? 0}
						unoptimized={props.graphic.mimeType === 'image/svg+xml'}
					/>
				))}
			</div>
		</div>
	)
}
