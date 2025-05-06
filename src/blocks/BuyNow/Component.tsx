import { Button } from '@/components/ui/button'
import { BuyNowBlockProps } from '@/payload-types'

export function BuyNowBlock(props: BuyNowBlockProps): React.JSX.Element {
	return (
		<div className="safe-width flex justify-center">
			<Button
				size="lg"
				variant="outline"
				className="mb-[6rem] w-full max-w-[47rem] border-primary text-primary"
			>
				{props.buttonLabel}
			</Button>
		</div>
	)
}
