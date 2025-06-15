import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { FocusRightSmallImageBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export function FocusRightSmallImageBlock(
	props: FocusRightSmallImageBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	const img = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-24 grid grid-cols-[3.5fr_3fr]">
			<RichText data={props.content} enableGutter={false} className="self-center text-primary" />
			<HeadlessImage
				media={img}
				placeholder={{ width: 1000, height: 1000 }}
				alt={matchLang({
					[Lang.English]: 'Focus right small image',
					[Lang.Vietnamese]: 'Hình ảnh nhỏ bên phải',
				})(props.__locale)}
				className="size-full max-h-[45rem] max-w-[30rem] place-self-end self-center object-cover pl-11"
			/>
		</div>
	)
}
