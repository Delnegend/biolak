import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Lang } from '@/i18n/routing'
import { CallToAddToCartBlockProps, Product } from '@/payload-types'

import { INTERNAL_AddToCartClient } from './AddToCart.client'

export async function CallToAddToCartBlock(
	props: CallToAddToCartBlockProps & {
		__product?: Product | null
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.callToAddToCart' })

	return (
		<div className="safe-width my-28 flex !max-w-[50rem] flex-col items-center text-primary">
			<HeadlessImage
				media={props.image}
				alt={t('bgImageAlt')}
				placeholder={{ width: 600, height: 600 }}
				className="aspect-square size-full max-w-[38rem] rounded-full object-cover"
			/>
			{props.content && (
				<RichText
					data={props.content}
					enableGutter={false}
					className="mt-4 [&_li]:text-xl"
					locale={props.locale}
				/>
			)}
			<INTERNAL_AddToCartClient buttonLabel={props.buttonLabel ?? t('buttonLabel')} />
		</div>
	)
}
