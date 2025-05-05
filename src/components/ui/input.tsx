import * as React from 'react'

import { cn } from '@/utilities/ui'

export function Input({
	className,
	type,
	...props
}: React.ComponentPropsWithRef<'input'>): React.JSX.Element {
	if (!type || type === 'text') {
		throw new Error('Use the customized TextInput component instead.')
	}

	return (
		<input
			className={cn(
				'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			type={type}
			{...props}
		/>
	)
}
