import Image from 'next/image'
import React from 'react'

import { Media } from '@/payload-types'

export function HeadlessImage({
	media,
	placeholder,
	alt = '',
	...props
}: {
	media?: Media | number | null
	placeholder?: {
		width?: number
		height?: number
	}
	alt?: string
} & Omit<
	React.ComponentPropsWithRef<typeof Image>,
	'width' | 'height' | 'src' | 'unoptimized' | 'alt' | 'placeholder' | 'unoptimized'
>): React.JSX.Element {
	const image = typeof media === 'object' ? media : null

	return (
		<Image
			{...props}
			src={
				image?.url ??
				`https://placehold.co/${placeholder?.width ?? 300}x${placeholder?.height ?? 300}`
			}
			alt={image?.alt ?? alt ?? ''}
			width={image?.width ?? placeholder?.width ?? 300}
			height={image?.height ?? placeholder?.height ?? 300}
			unoptimized={!image}
			quality={90}
		/>
	)
}
