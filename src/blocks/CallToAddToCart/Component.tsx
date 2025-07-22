import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { CallToAddToCartBlockProps, Product } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { INTERNAL_AddToCartClient } from './AddToCart.client'
import { CallToAddToCartBlockDefaults as defaults } from './defaults'

export function CallToAddToCartBlock(
	props: CallToAddToCartBlockProps & {
		__product?: Product | null
		__locale: Lang
	},
): React.JSX.Element {
	return (
		<div className="safe-width my-28 flex !max-w-[50rem] flex-col items-center text-primary">
			<HeadlessImage
				media={props.image}
				alt={matchLang({
					[Lang.English]: 'Background image for call to add to cart button',
					[Lang.Vietnamese]: 'Hình nền cho nút thêm vào giỏ hàng',
				})(props.__locale)}
				placeholder={{ width: 600, height: 600 }}
				className="aspect-square size-full max-w-[38rem] rounded-full object-cover"
			/>
			{props.content && (
				<RichText
					data={props.content}
					enableGutter={false}
					className="mt-4 [&_li]:text-xl"
					locale={props.__locale}
				/>
			)}
			<INTERNAL_AddToCartClient
				buttonLabel={props.buttonLabel ?? defaults.buttonLabel(props.__locale)}
				locale={props.__locale}
			/>
		</div>
	)
}
