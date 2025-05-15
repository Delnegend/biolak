import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { Product } from '@/payload-types'

export function ProductHero({
	product: p,
	overrides,
}: {
	product: Product
	overrides?: {
		subtitle?: string | null
		title?: string | null
		description?: DefaultTypedEditorState | null
	}
}): React.JSX.Element {
	const img = p.heroMedia && typeof p.heroMedia === 'object' ? p.heroMedia : null

	const subtitle = overrides?.subtitle ?? p.title
	const title = overrides?.title ?? p.shortDescription
	const description = overrides?.description ?? p.longDescription

	return (
		<div className="grid h-[58.75rem] grid-cols-2">
			<Image
				src={img?.url ?? 'https://placehold.co/1000x1000'}
				alt={img?.alt ?? 'Product Image'}
				width={img?.width ?? 1000}
				height={img?.height ?? 1000}
				unoptimized={!img}
				className="size-full object-cover"
			/>
			<div className="flex flex-col justify-center p-[7rem] text-primary">
				{subtitle && <div className="mb-1 text-xl font-medium">{subtitle}</div>}
				<div className="mb-4 text-balance font-serif text-7xl font-medium">
					{title ?? title}
				</div>
				{description && (
					<div className="text-balance text-xl leading-8">
						<RichText data={description} enableGutter={false} />
					</div>
				)}
			</div>
		</div>
	)
}
