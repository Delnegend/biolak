import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Lang } from '@/i18n/routing'
import { FocusLeftSmallImageBlockProps } from '@/payload-types'

export async function FocusLeftSmallImageBlock(
	props: FocusLeftSmallImageBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({
		locale: props.locale,
		namespace: 'blocks.focusLeftSmallImage',
	})

	return (
		<div className="safe-width my-24 grid grid-cols-[3fr_3.5fr]">
			<HeadlessImage
				media={props.image}
				placeholder={{ width: 1000, height: 1000 }}
				alt={t('alt')}
				className="size-full max-h-[35rem] max-w-[23rem] self-center object-cover px-11"
			/>
			<RichText
				data={props.content}
				enableGutter={false}
				className="self-center text-primary"
				locale={props.locale}
			/>
		</div>
	)
}
