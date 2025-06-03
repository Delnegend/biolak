import React from 'react'

import RichText from '@/components/RichText'
import type { ContentBlockProps } from '@/payload-types'
import { cssStringToStyle } from '@/utilities/cssStringToStyle'
import { cn } from '@/utilities/ui'

import { CMSLink } from '../../components/CMSLink'

export function ContentBlock({ columns }: ContentBlockProps): React.JSX.Element {
	const colsSpanClasses = {
		full: '12',
		half: '6',
		oneThird: '4',
		twoThirds: '8',
	}

	return (
		<div className="container my-16 text-primary">
			<div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
				{columns &&
					columns.length > 0 &&
					columns.map((col, index) => {
						const { enableLink, link, richText, size, font, customCss } = col

						return (
							<div
								className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size ?? 'full']}`, {
									'md:col-span-2': size !== 'full',
									'font-serif': font === 'serif',
									'font-sans': font === 'sans-serif',
									'font-mono': font === 'monospace',
								})}
								key={index}
								style={cssStringToStyle(customCss)}
							>
								{richText && <RichText data={richText} enableGutter={false} />}

								{enableLink && link && <CMSLink {...link} type={link.type ?? undefined} />}
							</div>
						)
					})}
			</div>
		</div>
	)
}
