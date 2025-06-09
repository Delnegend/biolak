import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { FocusLeftSmallImageBlockProps } from '@/payload-types'

export function FocusLeftSmallImageBlock(props: FocusLeftSmallImageBlockProps): React.JSX.Element {
	return (
		<div className="safe-width my-24 grid grid-cols-[3fr_3.5fr]">
			<HeadlessImage
				media={props.image}
				placeholder={{ width: 1000, height: 1000 }}
				className="size-full max-h-[35rem] max-w-[23rem] self-center object-cover px-11"
			/>
			<RichText data={props.content} enableGutter={false} className="self-center text-primary" />
		</div>
	)
}
