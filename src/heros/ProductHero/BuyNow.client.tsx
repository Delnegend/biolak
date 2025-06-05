'use client'

import { Button } from '@/components/ui/button'
import { useClientLang } from '@/hooks/useClientLang'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_BuyNowClient({
	hasAtLeastOneProductInStock,
}: {
	hasAtLeastOneProductInStock: boolean
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 uppercase"
			hideArrow={true}
			tabIndex={-1}
			disabled={!selectedProductVariant?.variant || !hasAtLeastOneProductInStock}
		>
			<a
				href={'/checkout?product=' + selectedProductVariant?.slug}
				onClick={(e) => {
					if (!selectedProductVariant?.variant) {
						e.preventDefault()
					}
				}}
				aria-label={matchLang({
					[Lang.English]: `Buy ${selectedProductVariant?.title} variant ${selectedProductVariant?.variant?.title} now`,
					[Lang.Vietnamese]: `Mua ngay ${selectedProductVariant?.title} loại ${selectedProductVariant?.variant?.title}`,
				})(locale)}
			>
				{matchLang({
					[Lang.English]: hasAtLeastOneProductInStock ? 'BUY NOW' : 'OUT OF STOCK',
					[Lang.Vietnamese]: hasAtLeastOneProductInStock ? 'MUA NGAY' : 'HẾT HÀNG',
				})(locale)}
				{selectedProductVariant?.variant && (
					<span> - {formatPrice(selectedProductVariant?.variant?.price)}</span>
				)}
			</a>
		</Button>
	)
}
