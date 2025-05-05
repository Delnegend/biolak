import React, { Fragment } from 'react'

import { ImageMedia } from './ImageMedia'
import type { Props } from './types'
import { VideoMedia } from './VideoMedia'

export function Media(props: Props): React.JSX.Element {
	const { className, htmlElement = 'div', resource } = props

	const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
	const Tag = htmlElement || Fragment

	return (
		<Tag
			{...(htmlElement !== null
				? {
						className,
					}
				: {})}
		>
			{isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
		</Tag>
	)
}
