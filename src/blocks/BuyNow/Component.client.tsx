import { Button } from '@/components/ui/button'

export function INTERNAL_BuyNowClient(props: {
	productSlug?: string | null
	buttonLabel: string
}): React.JSX.Element {
	return (
		<Button
			size="lg"
			variant="outline"
			className="mb-[6rem] w-full max-w-[47rem] border-primary text-primary"
			tabIndex={-1}
			disabled={!props.productSlug}
		>
			<a href={'/checkout?product=' + props.productSlug}>{props.buttonLabel}</a>
		</Button>
	)
}
