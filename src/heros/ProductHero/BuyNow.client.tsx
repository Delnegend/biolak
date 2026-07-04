'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utilities/formatPrice'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_BuyNowButton({
	disabled,
	locale: _locale,
}: {
	disabled?: boolean
	locale?: string
}): React.JSX.Element {
	const t = useTranslations('heros.productHero.buyNow')
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
					if (
						!selectedProductVariant?.product.id ||
						!selectedProductVariant?.variant.sku
					) {
						e.preventDefault()
					}
				}}
				aria-label={t('ariaLabel', {
					product: selectedProductVariant?.product.title ?? '',
					variant: selectedProductVariant?.variant.title ?? '',
				})}
			>
				{disabled ? t('outOfStock') : t('label')}
				{selectedProductVariant && (
					<span> - {formatPrice(selectedProductVariant?.variant.price)}</span>
				)}
			</a>
		</Button>
	)
}
