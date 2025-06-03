'use client'

import { Button } from '@/components/ui/button'
import { useClientLang } from '@/hooks/useClientLang'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { useProductVariantContext } from './ProductVariantContext'

export function INTERNAL_BuyNowClient(): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { product } = useProductVariantContext()

	return (
		<Button
			size="lg"
			className="flex items-center justify-between gap-4 uppercase"
			hideArrow={true}
			tabIndex={-1}
			disabled={!product.variant}
		>
			<a
				href={'/checkout?product=' + product.slug}
				onClick={(e) => {
					if (!product.variant) {
						e.preventDefault()
					}
				}}
				aria-label={matchLang({
					[Lang.English]: `Buy ${product.title} variant ${product.variant?.title} now`,
					[Lang.Vietnamese]: `Mua ngay ${product.title} loại ${product.variant?.title}`,
				})({ locale })}
			>
				{matchLang({
					[Lang.English]: 'BUY NOW',
					[Lang.Vietnamese]: 'MUA NGAY',
				})({ locale })}
				{product.variant && <span> - {formatPrice(product.variant.price)}</span>}
			</a>
		</Button>
	)
}
