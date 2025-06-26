import { ProductsSlug } from '@/collections/Products/slug'
import { BuyNowBlockProps, Product } from '@/payload-types'
import { findValidProductVariant } from '@/utilities/findValidProductVariant'
import { Lang } from '@/utilities/lang'

import { INTERNAL_BuyNowClient } from './Component.client'
import { BuyNowBlockDefaults as defaults } from './defaults'

export function BuyNowBlock(
	props: BuyNowBlockProps & {
		__product?: Product | null
		__locale?: Lang
	},
) {
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
				buttonLabel={props.buttonLabel ?? defaults.buttonLabel(props.__locale)}
			/>
		</div>
	)
}
