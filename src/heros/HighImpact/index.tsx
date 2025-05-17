'use client'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'

export function HighImpactHero(props: Page['hero']): React.JSX.Element {
	return (
		<div
			className="relative -mt-[10.4rem] flex items-center justify-center text-white"
			data-theme="dark"
		>
			<div className="container relative z-10 mb-8 flex items-center justify-center">
				<div className="max-w-[36.5rem] md:text-center">
					{props.title && (
						<h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">{props.title}</h1>
					)}
					{props.subtitle && (
						<h2 className="mb-4 text-2xl font-bold md:text-4xl lg:text-5xl">
							{props.subtitle}
						</h2>
					)}
					{props.description && (
						<RichText className="mb-6" data={props.description} enableGutter={false} />
					)}
					{Array.isArray(props.links) && props.links.length > 0 && (
						<ul className="flex gap-4 md:justify-center">
							{props.links.map(({ link }, i) => {
								return (
									<li key={i}>
										<CMSLink {...link} type={link.type ?? undefined} />
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
			<div className="min-h-[80vh] select-none">
				{props.media && typeof props.media === 'object' && (
					<Media fill imgClassName="-z-10 object-cover" priority resource={props.media} />
				)}
			</div>
		</div>
	)
}
