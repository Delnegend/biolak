import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { INTERNAL_AddToCartClient } from './AddToCart.client'
import { INTERNAL_BuyNowClient } from './BuyNow.client'
import { INTERNAL_ProductVariantsClient } from './ProductVariants.client'

export async function ProductHero({
	product: p,
	overrides,
}: {
	product: Product
	overrides?: {
		subtitle?: string | null
		title?: string | null
		description?: DefaultTypedEditorState | null
	}
}): Promise<React.JSX.Element> {
	const locale = await getClientLang()

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
			<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					alt={
						img?.alt ??
						matchLang({
							[Lang.English]: 'Product hero background image',
							[Lang.Vietnamese]: 'Hình nền hero sản phẩm',
						})({ locale })
					}
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

				<INTERNAL_ProductVariantsClient variants={p.variants} productSlug={p.slug} />

				<div className="mt-8 grid size-full h-fit grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] gap-4">
					<INTERNAL_BuyNowClient />
					<INTERNAL_AddToCartClient />
				</div>
			</div>
		</div>
	)
}
