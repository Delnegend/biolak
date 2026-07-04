import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Lang } from '@/i18n/routing'
import { FocusRightSmallImageBlockProps } from '@/payload-types'

export async function FocusRightSmallImageBlock(
	props: FocusRightSmallImageBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({
		locale: props.locale,
		namespace: 'blocks.focusRightSmallImage',
	})
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-24 grid grid-cols-[3.5fr_3fr]">
			<RichText
				data={props.content}
				enableGutter={false}
				className="self-center text-primary"
				locale={props.locale}
			/>
			<HeadlessImage
				media={img}
				placeholder={{ width: 1000, height: 1000 }}
				alt={t('alt')}
				className="size-full max-h-[45rem] max-w-[30rem] place-self-end self-center object-cover pl-11"
			/>
		</div>
	)
}
