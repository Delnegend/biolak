import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const BestSellerBlockDefaults = {
	/** `Sản phẩm bán chạy` */
	title: matchLang({
		[Lang.English]: 'Best Seller',
		[Lang.Vietnamese]: 'Sản phẩm bán chạy',
	}),
} as const
