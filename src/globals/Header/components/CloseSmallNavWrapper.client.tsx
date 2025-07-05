'use client'

import { Slot } from '@radix-ui/react-slot'

import { useHeaderContext } from '../hooks/useHeaderContext'

export function INTERNAL_CloseSmallNavWrapper({
	children,
	className,
	asChild,
}: {
	children: React.ReactNode
	className?: string
	asChild?: boolean
}): React.JSX.Element {
	const Comp = asChild ? Slot : 'div'
	const { setSmallNavOpen } = useHeaderContext()

	return (
		<Comp onClick={() => setSmallNavOpen(false)} className={className}>
			{children}
		</Comp>
	)
}
