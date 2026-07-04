import { getTranslations } from 'next-intl/server'

import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/i18n/routing'
import { BuyNowBlockProps, Product } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'

import { INTERNAL_BuyNowClient } from './Component.client'

export async function BuyNowBlock(
	props: BuyNowBlockProps & {
		__product?: Product | null
		locale: Lang
	},
) {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.buyNow' })
	const p =
		typeof props[ProductsSlug] === 'object' && !!props[ProductsSlug]
			? props[ProductsSlug]
			: props?.__product
	if (!p) {
		throw new Error(
			'BuyNowBlock must be used within a product page or specified with a product prop',
		)
	}

	return (
		<div className="safe-width my-6 flex justify-center md:my-24">
			<INTERNAL_BuyNowClient
				productSlug={p.slug}
				fallbackVariantSku={findValidProductVariant(p.variants)?.sku}
				buttonLabel={props.buttonLabel ?? t('buttonLabel')}
			/>
		</div>
	)
}
