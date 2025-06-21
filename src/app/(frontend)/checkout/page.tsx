import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderName } from '@/utilities/headerName'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export default async function Checkout(): Promise<React.JSX.Element> {
	const [locale, payload, headers] = await Promise.all([
		getClientLang(),
		getPayload({ config }),
		getHeaders(),
	])

	const [global, overrideProduct] = await Promise.all([
		getCachedGlobal<CheckoutPageGlobal>(CheckoutPageGlobalSlug, 1, locale)(),
		tryCatch(async () => {
			const requestQuery = new URLSearchParams(headers.get(HeaderName.RequestQuery) ?? '')
			const overrideProductId = Number(requestQuery.get('product'))
			const overrideVariantSku = requestQuery.get('variant') ?? null
			if (!overrideVariantSku || Number.isNaN(overrideProductId)) return null

			const products = await payload.find({
				collection: ProductsSlug,
				where: {
					id: {
						equals: overrideProductId,
					},
				},
				select: {
					title: true,
					variants: true,
					icon: true,
					slug: true,
				},
				limit: 1,
				locale,
			})
			const product = products.docs[0]
			if (!product) return null
			const validVariant = product.variants.find(
				(v) => v.stock > 0 && v.sku === overrideVariantSku,
			)
			if (!validVariant) return null

			return {
				product: {
					id: overrideProductId,
					title: product.title,
					slug: product.slug,
				},
				variant: {
					sku: validVariant.sku,
					title: validVariant.title,
					price: validVariant.price,
					image: validVariant.image ?? product.icon,
				},
			}
		}),
	])

	return (
		<div className="safe-width mb-16">
			<Image
				src="https://placehold.co/128x64"
				width={1000}
				height={1000}
				alt={matchLang({
					[Lang.English]: 'Brand Logo',
					[Lang.Vietnamese]: 'Logo thuơng hiệu',
				})(locale)}
				className="my-16 h-16 w-32 overflow-hidden object-contain"
				unoptimized={true}
			/>
			<PageClient
				global={global}
				override={overrideProduct.ok && overrideProduct.data ? overrideProduct.data : undefined}
				locale={locale}
			/>
		</div>
	)
}
