import { cn } from '@/utilities/ui'

export function INTERNAL_CardTitle({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<'h3'>): React.JSX.Element {
	return (
		<h3
			className={cn('font-sans text-xl font-bold leading-8 text-primary', className)}
			{...props}
		>
			{children}
		</h3>
	)
}
