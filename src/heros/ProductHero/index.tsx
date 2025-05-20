import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { CirclePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Product } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'

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

	const title = (!!overrides?.title ? overrides.title : undefined) ?? p.title
	const description =
		(!!overrides?.description ? overrides.description : undefined) ?? p.longDescription

	const category =
		Array.isArray(p.productCategories) && typeof p.productCategories[0] === 'object'
			? p.productCategories[0]
			: null
	const subCategory =
		Array.isArray(p.productSubCategories) && typeof p.productSubCategories[0] === 'object'
			? p.productSubCategories[0]
			: null

	const subtitle = [category?.title, subCategory?.title].filter((c) => c).join(' • ')

	return (
		<div className="relative grid min-h-[50dvw] grid-cols-2 text-balance">
			<div />
			<div className="absolute inset-0 z-0 overflow-hidden">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					alt={img?.alt ?? 'Product Image'}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					unoptimized={!img}
					className="h-full w-1/2 overflow-hidden object-cover"
				/>
			</div>
			<div className="flex size-full flex-col justify-center p-[7rem] text-primary">
				{subtitle && <div className="mb-1 text-xl font-medium">{subtitle}</div>}
				<div className="mb-4 font-serif text-5xl font-medium">{title ?? title}</div>
				{description && (
					<div className="compact text-xl leading-8">
						<RichText data={description} enableGutter={false} />
					</div>
				)}

				<Button
					size="lg"
					className="mt-8 flex w-fit min-w-[28rem] items-center justify-between gap-4 uppercase"
					hideArrow={true}
				>
					<span>THÊM VÀO GIỎ - {formatPrice(p.price)}</span>
					<CirclePlus />
				</Button>
			</div>
		</div>
	)
}
