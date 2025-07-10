import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { PaymentGlobalSlug } from '@/globals/Payment/slug'
import { CheckoutPageGlobal, PaymentGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch } from '@/utilities/tryCatch'

import PageClient from './page.client'

export default async function Checkout({
	searchParams: searchParams_,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<React.JSX.Element> {
	const [locale, payload, searchParams] = await Promise.all([
		getClientLang(),
		getPayload({ config }),
		searchParams_,
	])

	const [global, paymentGlobal, overrideProduct] = await Promise.all([
		getCachedGlobal<CheckoutPageGlobal>(CheckoutPageGlobalSlug, 1, locale)(),
		getCachedGlobal<PaymentGlobal>(PaymentGlobalSlug, 1, locale)(),
		tryCatch(async () => {
			const overrideProductId = Number(searchParams.product)
			const overrideVariantSku = searchParams.variant ? String(searchParams.variant) : null
			if (
				!overrideVariantSku ||
				typeof searchParams.variant !== 'string' ||
				Number.isNaN(overrideProductId)
			)
				return null

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
				width={96}
				height={49}
				src="/biolak-logo.svg"
				alt={matchLang({
					[Lang.English]: 'Brand Logo',
					[Lang.Vietnamese]: 'Logo thuơng hiệu',
				})(locale)}
				className="my-16 h-16 w-32 overflow-hidden object-contain"
			/>
			<PageClient
				global={{
					...global,
					bankAccountNumber: paymentGlobal.bankAccountNumber,
					bankName: paymentGlobal.bankName,
				}}
				overrideProduct={
					overrideProduct.ok && overrideProduct.data ? overrideProduct.data : undefined
				}
				locale={locale}
			/>
		</div>
	)
}

export async function generateMetadata(): Promise<{
	metadataBase: URL
	title: string
}> {
	const locale = await getClientLang()
	return {
		metadataBase: new URL('https://biolak.vn'),
		title: matchLang({
			[Lang.English]: 'Checkout | BioLAK',
			[Lang.Vietnamese]: 'Thanh toán | BioLAK',
		})(locale),
	}
}
