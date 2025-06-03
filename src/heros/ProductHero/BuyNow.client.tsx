'use client'

import { Button } from '@/components/ui/button'
import { useClientLang } from '@/hooks/useClientLang'
import { Product } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export function INTERNAL_BuyNowClient({
	product,
}: {
	product: {
		slug: Product['slug']
		price: Product['price']
	}
}): React.JSX.Element {
	const { lang: locale } = useClientLang()

	return (
		<Button
			size="lg"
			className="flex items-center justify-between gap-4 uppercase"
			hideArrow={true}
			tabIndex={-1}
		>
			<a href={'/checkout?product=' + product.slug}>
				{matchLang({
					[Lang.English]: 'BUY NOW',
					[Lang.Vietnamese]: 'MUA NGAY',
				})({ locale })}{' '}
				- {formatPrice(product.price)}
			</a>
		</Button>
	)
}
