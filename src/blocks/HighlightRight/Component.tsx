import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { HighlightRightBlockProps } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export async function HighlightRightBlock(
	props: HighlightRightBlockProps,
): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	return (
		<div className="safe-width my-28 grid grid-cols-[1fr_25rem] gap-[7rem] text-primary">
			<div>
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'Highlight right image',
						[Lang.Vietnamese]: 'Hình ảnh nổi bật bên phải',
					})(locale)}
					className="aspect-square size-[25rem] overflow-hidden rounded-full object-cover"
				/>
				<div className="relative mt-28 text-center text-5xl">
					{props.order.toString().padStart(2, '0')}
					<div className="absolute left-1/2 top-[-13.5rem] h-[13rem] w-[2px] -translate-x-1/2 bg-primary" />
				</div>
			</div>

			<div className="-order-1 self-center">
				<div className="mb-[2.5rem] font-serif text-[2rem] italic"> {props.title}</div>
				<div className="text-balance text-[2rem]">{props.description}</div>
			</div>
		</div>
	)
}
