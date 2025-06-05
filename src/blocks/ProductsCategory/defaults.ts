import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ProductsCategoryBlockDefaults = {
	/** `XEM TẤT CẢ CÁC SẢN PHẨM` */
	buttonLabel: matchLang({
		[Lang.English]: 'VIEW ALL PRODUCTS',
		[Lang.Vietnamese]: 'XEM TẤT CẢ CÁC SẢN PHẨM',
	}),
}
