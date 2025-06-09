import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { FocusRightLargeImageBlockProps } from '@/payload-types'

export function FocusRightLargeImageBlock(
	props: FocusRightLargeImageBlockProps,
): React.JSX.Element {
	return (
		<div
			className="grid grid-cols-[5%_1fr_1fr_5%] text-primary"
			style={{ gridTemplateAreas: '". content img img' }}
		>
			<div
				className="mr-16 max-w-[36rem] self-center justify-self-end"
				style={{ gridArea: 'content' }}
			>
				<RichText data={props.content} enableGutter={false} />
			</div>
			<HeadlessImage
				media={props.image}
				alt="Placeholder image"
				placeholder={{ width: 1000, height: 1000 }}
				className="size-full max-w-[calc(80rem*55/100)] object-cover"
				style={{ gridArea: 'img' }}
			/>
		</div>
	)
}
