'use client'
import './style.scss'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Media } from '@/payload-types'

export function INTERNAL_InfiniteScrollBlock(props: {
	graphic?: Media | null
	animationDuration: number
	locale?: string
}): React.JSX.Element {
	const t = useTranslations('blocks.infiniteScroll')
	const containerRef = useRef<HTMLDivElement>(null)
	const [renderCount, setRenderCount] = useState(3)
	const [bannerProportion, setBannerProportion] = useState(100)

	function setRenderCountHelper(): void {
		const containerWidth = containerRef.current?.clientWidth
		const bannerWidth = props.graphic?.width

		if (!containerWidth || !bannerWidth) return

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
					<HeadlessImage
						key={i}
						media={props.graphic}
						alt={t('alt')}
						placeholder={{ width: 1000, height: 100 }}
					/>
				))}
			</div>
		</div>
	)
}
