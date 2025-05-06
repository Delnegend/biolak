import Image from 'next/image'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { CallToAddToCartBlockProps } from '@/payload-types'

export function CallToAddToCartBlock(props: CallToAddToCartBlockProps): React.JSX.Element {
	const image = props.image && typeof props.image === 'object' ? props.image : null

	return (
		<div className="safe-width my-[7rem] flex !max-w-[50rem] flex-col items-center text-primary">
			<Image
				src={image?.url ?? 'https://placehold.co/600x600'}
				alt={image?.alt ?? 'Image'}
				width={image?.width ?? 600}
				height={image?.height ?? 600}
				unoptimized={image === null}
				className="aspect-square size-full max-w-[38rem] rounded-full object-cover"
			/>
			{props.content && (
				<RichText data={props.content} enableGutter={false} className="mt-4 [&_li]:text-xl" />
			)}
			<Button
				size="lg"
				variant="outline"
				className="mt-6 w-full max-w-[47rem] border-primary text-primary"
			>
				{props.buttonLabel}
			</Button>
		</div>
	)
}
