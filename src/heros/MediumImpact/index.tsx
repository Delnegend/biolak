import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'

export function MediumImpactHero(props: Page['hero']): React.JSX.Element {
	return (
		<div>
			<div className="container mb-8">
				{props.description && (
					<RichText className="mb-6" data={props.description} enableGutter={false} />
				)}

				{Array.isArray(props.links) && props.links.length > 0 && (
					<ul className="flex gap-4">
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
			<div className="container">
				{props.media && typeof props.media === 'object' && (
					<div>
						<Media
							className="-mx-4 md:-mx-8 2xl:-mx-16"
							imgClassName=""
							priority
							resource={props.media}
						/>
						{props.media?.caption && (
							<div className="mt-3">
								<RichText data={props.media.caption} enableGutter={false} />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
