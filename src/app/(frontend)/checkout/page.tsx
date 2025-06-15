import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobal } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'
import { getClientLang } from '@/utilities/getClientLang'
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
			const overrideProductIdNumber = Number(requestQuery.get('product'))
			const overrideVariantSku = requestQuery.get('variant') ?? null
			if (!overrideVariantSku || Number.isNaN(overrideProductIdNumber)) return null

			const product = await payload.find({
				collection: ProductsSlug,
				where: {
					id: {
						equals: overrideProductIdNumber,
					},
				},
				select: {
					title: true,
					variants: true,
					icon: true,
					slug: true,
				},
			})
			if (product.docs.length <= 0 || !product.docs[0]) return null

			const validVariant = findValidProductVariant(product.docs[0].variants)
			if (!validVariant) return null

			return {
				product: {
					id: overrideProductIdNumber,
					title: product.docs[0].title,
					slug: product.docs[0].slug,
				},
				variant: {
					sku: validVariant.sku,
					title: validVariant.title,
					price: validVariant.price,
					image: validVariant.image ?? product.docs[0].icon,
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
			/>
		</div>
	)
}
