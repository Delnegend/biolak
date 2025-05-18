'use client'

import React, { useRef } from 'react'

import { cn } from '@/utilities/ui'

export function TextInput({
	label,
	type,
	onBlur,
	onFocus,
	ref: providedRef,
	classNames,
	...props
}: Omit<React.ComponentPropsWithRef<'input'>, 'placeholder'> & {
	label: string
	classNames?: { container?: string; input?: string; label?: string }
}): React.JSX.Element {
	const [elevated, setElevated] = React.useState(false)
	const internalRef = useRef<HTMLInputElement>(null)
	const ref = providedRef ?? internalRef

	return (
		<div
			className={cn(
				'relative flex h-14 items-end border-b border-b-[#6b5a4a] transition-colors focus-within:border-b-black',
				classNames?.container,
			)}
		>
			<input
				className={cn(
					'relative flex h-10 w-full border-none bg-transparent text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					classNames?.input,
				)}
				type={type}
				onFocus={(e) => {
					setElevated(true)
					onFocus?.(e)
				}}
				onBlur={(e) => {
					if (!Boolean(e.target.value)) {
						setElevated(false)
					}
					onBlur?.(e)
				}}
				{...props}
				ref={ref}
			/>
			<div
				className={cn(
					'pointer-events-none absolute left-0 flex whitespace-nowrap text-[#6B5A4A] transition-all',
					elevated ? '-top-3 text-lg' : 'top-0 text-2xl',
					classNames?.label,
				)}
			>
				{label}
			</div>
		</div>
	)
}
