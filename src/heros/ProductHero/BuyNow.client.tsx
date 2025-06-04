'use client'

import { Button } from '@/components/ui/button'
import { useClientLang } from '@/hooks/useClientLang'
import { Product } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useSelectProductVariant } from './ProductVariantContext'

export function INTERNAL_BuyNowClient({
	fallbackVariant,
}: {
	fallbackVariant?: Product['variants'][number] | null
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { selectedProductVariant } = useSelectProductVariant()

	const variant = selectedProductVariant?.variant ?? fallbackVariant ?? undefined

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 uppercase"
			hideArrow={true}
			tabIndex={-1}
			disabled={!variant}
		>
			<a
				href={'/checkout?product=' + selectedProductVariant?.slug}
				onClick={(e) => {
					if (!variant) {
						e.preventDefault()
					}
				}}
				aria-label={matchLang({
					[Lang.English]: `Buy ${selectedProductVariant?.title} variant ${variant?.title} now`,
					[Lang.Vietnamese]: `Mua ngay ${selectedProductVariant?.title} loại ${variant?.title}`,
				})({ locale })}
			>
				{matchLang({
					[Lang.English]: 'BUY NOW',
					[Lang.Vietnamese]: 'MUA NGAY',
				})({ locale })}
				{variant && <span> - {formatPrice(variant.price)}</span>}
			</a>
		</Button>
	)
}
