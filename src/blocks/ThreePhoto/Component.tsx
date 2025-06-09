import { HeadlessImage } from '@/components/Media/HeadlessImage'
import type { ThreePhotoBlockProps } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export async function ThreePhotoBlock(props: ThreePhotoBlockProps): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	return (
		<div className="mx-auto my-28 grid w-4/5 max-w-7xl grid-cols-[290fr_620fr_290fr] gap-x-10">
			<HeadlessImage
				media={props.photoLeft}
				className="place-self-center"
				placeholder={{ width: 290, height: 442 }}
				alt={matchLang({
					[Lang.English]: 'Left Photo',
					[Lang.Vietnamese]: 'Ảnh bên trái',
				})(locale)}
			/>
			<HeadlessImage
				className="place-self-center"
				media={props.photoCenter}
				placeholder={{ width: 620, height: 725 }}
				alt={matchLang({
					[Lang.English]: 'Center Photo',
					[Lang.Vietnamese]: 'Ảnh ở giữa',
				})(locale)}
			/>
			<HeadlessImage
				className="place-self-center"
				media={props.photoRight}
				placeholder={{ width: 290, height: 442 }}
				alt={matchLang({
					[Lang.English]: 'Right Photo',
					[Lang.Vietnamese]: 'Ảnh bên phải',
				})(locale)}
			/>
		</div>
	)
}
