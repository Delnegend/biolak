'use client'

import React from 'react'

import { cn } from '@/utilities/ui'

export function TextInput({
	label,
	size = 'lg',
	type,
	onBlur,
	onFocus,
	classNames,
	...props
}: Omit<React.ComponentPropsWithRef<'input'>, 'placeholder' | 'size'> & {
	label: string
	size?: 'sm' | 'lg'
	classNames?: { container?: string; input?: string; label?: string }
}): React.JSX.Element {
	const [elevated, setElevated] = React.useState(false)

	return (
		<div
			className={cn(
				'relative flex h-14 items-end border-b border-b-[#6b5a4a] transition-all focus-within:border-b-2 focus-within:border-b-black',
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
					if (!e.target.value) {
						setElevated(false)
					}
					onBlur?.(e)
				}}
				{...props}
			/>
			<div
				className={cn(
					'pointer-events-none absolute left-0 flex whitespace-nowrap text-muted-foreground transition-all',
					{
						'-top-3 text-lg': elevated && size === 'lg',
						'top-0 text-2xl': !elevated && size === 'lg',
						'-top-1 text-base': elevated && size === 'sm',
						'top-0 text-xl': !elevated && size === 'sm',
					},
					classNames?.label,
				)}
			>
				{label}
			</div>
		</div>
	)
}
