import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderName } from '@/utilities/headerName'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import PageClient from './page.client'

export default async function Checkout(): Promise<React.JSX.Element> {
	const [locale, payload, headers] = await Promise.all([
		getClientLang(),
		getPayload({ config }),
		getHeaders(),
	])

	const requestQuery = new URLSearchParams(headers.get(HeaderName.RequestQuery) ?? '')
	const overrideProductSlug = requestQuery.get('product') ?? ''
	const overrideProductVariantSku = requestQuery.get('variant') ?? null

	const [global, overrideProduct] = await Promise.all([
		getCachedGlobal<CheckoutPageGlobal>(CheckoutPageGlobalSlug, 1, locale)(),
		payload
			.find({
				collection: ProductsSlug,
				where: {
					slug: {
						equals: overrideProductSlug,
					},
				},
				select: {
					title: true,
					variants: true,
				},
			})
			.then(
				(data) => {
					if (data.docs.length <= 0 || !data.docs[0]) return null

					const foundVariant = data.docs[0].variants.find(
						(variant) => variant.sku === overrideProductVariantSku,
					)
					if (!foundVariant) return null

					return {
						product: {
							slug: overrideProductSlug,
							title: data.docs[0].title,
						},
						variant: foundVariant,
					}
				},
				(_) => null,
			),
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
				})({ locale })}
				className="my-16 h-16 w-32 overflow-hidden object-contain"
				unoptimized={true}
			/>
			<PageClient
				global={global}
				overrideProduct={
					overrideProduct
						? {
								slug: overrideProduct.product.slug,
								title: overrideProduct.product.title,
								variant: overrideProduct.variant,
							}
						: null
				}
			/>
		</div>
	)
}
