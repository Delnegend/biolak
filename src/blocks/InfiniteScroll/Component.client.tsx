'use client'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import './style.scss'

export function InfiniteScrollBlockCC({
	graphic,
	animationDuration,
}: {
	graphic: Media
	animationDuration: number
}): React.JSX.Element {
	const containerRef = useRef<HTMLDivElement>(null)
	const [renderCount, setRenderCount] = useState(3)
	const [bannerProportion, setBannerProportion] = useState(100)

	function setRenderCountHelper(): void {
		const containerWidth = containerRef.current?.clientWidth
		const bannerWidth = graphic.width

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
	}, [])

	return (
		<div
			ref={containerRef}
			className="flex h-48 items-center overflow-hidden"
			id="infinite-scroll-block"
			style={{
				// @ts-expect-error idc
				'--animation-duration': `${animationDuration}s`,
				'--banner-proportion': `-${bannerProportion}%`,
			}}
		>
			<div className="flex flex-row overflow-x-visible">
				{Array.from({ length: renderCount }).map((_, i) => (
					<Image
						key={i}
						src={graphic.url ?? ''}
						alt={graphic.alt ?? ''}
						width={graphic.width ?? 0}
						height={graphic.height ?? 0}
						unoptimized={graphic.mimeType === 'image/svg+xml'}
					/>
				))}
			</div>
		</div>
	)
}
