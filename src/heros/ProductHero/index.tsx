import React from 'react'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Product } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'
import { getClientLang } from '@/utilities/getClientLocale'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { INTERNAL_AddToCartButton } from './AddToCart.client'
import { INTERNAL_BuyNowButton } from './BuyNow.client'
import { INTERNAL_ProductVariantSelector } from './ProductVariantSelector.client'

export async function ProductHero({
	product: p,
}: {
	product: Product
}): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	const category =
		Array.isArray(p.productCategories) && typeof p.productCategories[0] === 'object'
			? p.productCategories[0]
			: null
	const subCategory =
		Array.isArray(p.productSubCategories) && typeof p.productSubCategories[0] === 'object'
			? p.productSubCategories[0]
			: null

	const subtitle = [category?.title, subCategory?.title].filter((c) => c).join(' • ')

	const validVariant = findValidProductVariant(p.variants)

	return (
		<div className="text-balance max-md:flex max-md:flex-col md:relative md:grid md:min-h-[50dvw] md:grid-cols-[2fr_3fr] lg:grid-cols-2">
			<div className="max-md:hidden" />
			<div className="pointer-events-none inset-0 z-0 overflow-hidden md:absolute">
				<HeadlessImage
					media={p.gallery?.[0]}
					alt={matchLang({
						[Lang.English]: 'Product main image',
						[Lang.Vietnamese]: 'Hình ảnh chính sản phẩm',
					})(locale)}
					placeholder={{ width: 1000, height: 1000 }}
					className="h-full overflow-hidden object-cover max-md:w-full md:w-2/5 lg:w-1/2"
				/>
			</div>
			<div className="flex size-full flex-col justify-center text-primary max-md:p-4 max-md:py-6 md:p-20 lg:p-28">
				{subtitle && <div className="mb-1 text-xl font-medium">{subtitle}</div>}
				<div className="mb-4 font-serif text-5xl font-medium">{p.title}</div>
				{p.longDescription ? (
					<div className="compact text-xl leading-8">
						<RichText data={p.longDescription} enableGutter={false} locale={locale} />
					</div>
				) : p.shortDescription ? (
					<div className="text-balance text-primary">{p.shortDescription}</div>
				) : null}

				<INTERNAL_ProductVariantSelector product={p} validVariant={validVariant} />

				<div className="mt-8 grid size-full h-fit grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
					<INTERNAL_BuyNowButton locale={locale} disabled={validVariant === null} />
					<INTERNAL_AddToCartButton locale={locale} disabled={validVariant === null} />
				</div>
			</div>
		</div>
	)
}
