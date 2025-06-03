import { ProductsSlug } from '@/collections/Products/slug'
import { BuyNowBlockProps, Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { INTERNAL_BuyNowClient } from './Component.client'

export function BuyNowBlock(passdownProps: {
	product?: Product | null
}): (_: BuyNowBlockProps) => Promise<React.JSX.Element> {
	return async function BuyNowBlock(props: BuyNowBlockProps) {
		const locale = await getClientLang()
		const p =
			typeof props[ProductsSlug] === 'object' && !!props[ProductsSlug]
				? props[ProductsSlug]
				: passdownProps.product
		if (!p) {
			throw new Error(
				'BuyNowBlock must be used within a product page or specified with a product prop',
			)
		}

		return (
			<div className="safe-width flex justify-center">
				<INTERNAL_BuyNowClient
					productSlug={p.slug!}
					buttonLabel={
						props.buttonLabel ??
						matchLang({
							[Lang.English]: 'BUY NOW',
							[Lang.Vietnamese]: 'MUA NGAY',
						})({ locale })
					}
				/>
			</div>
		)
	}
}
