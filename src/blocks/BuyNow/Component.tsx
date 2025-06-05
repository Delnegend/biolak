import { ProductsSlug } from '@/collections/Products/slug'
import { BuyNowBlockProps, Product } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'
import { getClientLang } from '@/utilities/getClientLang'

import { INTERNAL_BuyNowClient } from './Component.client'
import { BuyNowBlockDefaults as defaults } from './defaults'

export async function BuyNowBlock(
	props: BuyNowBlockProps & {
		__product?: Product | null
	},
) {
	const locale = await getClientLang()
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
		<div className="safe-width mb-24 flex justify-center">
			<INTERNAL_BuyNowClient
				productSlug={p.slug}
				fallbackVariantSku={findValidProductVariant(p.variants)?.sku}
				buttonLabel={props.buttonLabel ?? defaults.buttonLabel(locale)}
			/>
		</div>
	)
}
