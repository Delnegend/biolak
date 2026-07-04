import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Lang } from '@/i18n/routing'
import type { ThreePhotoBlockProps } from '@/payload-types'

export async function ThreePhotoBlock(
	props: ThreePhotoBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.threePhoto' })

	return (
		<div className="mx-auto my-28 grid w-4/5 max-w-7xl grid-cols-[290fr_620fr_290fr] gap-x-10">
			<HeadlessImage
				media={props.photoLeft}
				className="place-self-center"
				placeholder={{ width: 290, height: 442 }}
				alt={t('left')}
			/>
			<HeadlessImage
				className="place-self-center"
				media={props.photoCenter}
				placeholder={{ width: 620, height: 725 }}
				alt={t('center')}
			/>
			<HeadlessImage
				className="place-self-center"
				media={props.photoRight}
				placeholder={{ width: 290, height: 442 }}
				alt={t('right')}
			/>
		</div>
	)
}
