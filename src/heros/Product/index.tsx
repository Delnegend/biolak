import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { Product } from '@/payload-types'

export function ProductHero({ product: p }: { product: Product }): React.JSX.Element {
	const media = p.heroMedia && typeof p.heroMedia === 'object' ? p.heroMedia : null

	return (
		<div className="grid h-[58.75rem] grid-cols-2">
			<Image
				src={media?.url ?? 'https://placehold.co/1000x1000'}
				alt={media?.alt ?? 'Product Image'}
				width={media?.width ?? 1000}
				height={media?.height ?? 1000}
				unoptimized={media === null}
				className="size-full object-cover"
			/>
			<div className="flex flex-col justify-center p-[7rem] text-primary">
				{p.heroSubtitle && <div className="mb-1 text-xl font-medium">{p.heroSubtitle}</div>}
				<div className="mb-4 text-balance font-serif text-7xl font-medium">
					{p.heroTitle ?? p.heroTitle}
				</div>
				{p.heroDescription && (
					<div className="text-balance text-xl leading-8">
						<RichText data={p.heroDescription} enableGutter={false} />
					</div>
				)}
			</div>
		</div>
	)
}
