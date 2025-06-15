'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_BuyNowButton({
	disabled,
	locale,
}: {
	disabled?: boolean
	locale?: Lang
}): React.JSX.Element {
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 uppercase"
			hideArrow={true}
			tabIndex={-1}
			disabled={!selectedProductVariant || disabled}
		>
			<a
				href={`/checkout?product=${selectedProductVariant?.product.id}&variant=${selectedProductVariant?.variant.sku}`}
				onClick={(e) => {
					if (!selectedProductVariant?.product.id || !selectedProductVariant?.variant.sku) {
						e.preventDefault()
					}
				}}
				aria-label={matchLang({
					[Lang.English]: `Buy ${selectedProductVariant?.product.title} variant ${selectedProductVariant?.variant.title} now`,
					[Lang.Vietnamese]: `Mua ngay ${selectedProductVariant?.product.title} loại ${selectedProductVariant?.variant.title}`,
				})(locale)}
			>
				{matchLang({
					[Lang.English]: disabled ? 'OUT OF STOCK' : 'BUY NOW',
					[Lang.Vietnamese]: disabled ? 'HẾT HÀNG' : 'MUA NGAY',
				})(locale)}
				{selectedProductVariant && (
					<span> - {formatPrice(selectedProductVariant?.variant.price)}</span>
				)}
			</a>
		</Button>
	)
}
