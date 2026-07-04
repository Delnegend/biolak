import { cn } from '@/utilities/ui'

export function INTERNAL_Card({
	className,
	children,
	...props
}: React.ComponentPropsWithRef<'div'> & {
	className?: string
	children: React.ReactNode
}): React.JSX.Element {
	return (
		<div
			className={cn('flex flex-col gap-y-4 rounded-xl bg-white p-6 text-primary', className)}
			{...props}
		>
			{children}
		</div>
	)
}
