import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { Lang } from '@/i18n/routing'
import { FocusRightLargeImageBlockProps } from '@/payload-types'

export async function FocusRightLargeImageBlock(
	props: FocusRightLargeImageBlockProps & { locale: Lang },
): Promise<React.JSX.Element> {
	const t = await getTranslations({
		locale: props.locale,
		namespace: 'blocks.focusRightLargeImage',
	})

	return (
		<div
			className="grid grid-cols-[5%_1fr_1fr_5%] text-primary"
			style={{ gridTemplateAreas: '". content img img' }}
		>
			<div
				className="mr-16 max-w-[36rem] self-center justify-self-end"
				style={{ gridArea: 'content' }}
			>
				<RichText data={props.content} enableGutter={false} locale={props.locale} />
			</div>
			<HeadlessImage
				media={props.image}
				alt={t('alt')}
				placeholder={{ width: 1000, height: 1000 }}
				className="size-full max-w-[calc(80rem*55/100)] object-cover"
				style={{ gridArea: 'img' }}
			/>
		</div>
	)
}
