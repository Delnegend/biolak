import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CallToAddToCartBlockDefaults = {
	/** `THÊM VÀO GIỎ HÀNG` */
	buttonLabel: matchLang({
		[Lang.English]: 'ADD TO CART',
		[Lang.Vietnamese]: 'THÊM VÀO GIỎ HÀNG',
	}),
}
