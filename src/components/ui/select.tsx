'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'
import { createContext, useContext } from 'react'

import { cn } from '@/utilities/ui'

const SelectContext = createContext<string | undefined>(undefined)

export function Select({
	value,
	onValueChange,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Root>): React.JSX.Element {
	const [selectedValue, setSelectedValue] = React.useState<string | undefined>(value)

	return (
		<SelectContext.Provider value={selectedValue}>
			<SelectPrimitive.Root
				{...props}
				onValueChange={(value) => {
					setSelectedValue(value)
					onValueChange?.(value ?? '')
				}}
			/>
		</SelectContext.Provider>
	)
}

export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({
	children,
	className,
	label,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger> & {
	label: React.ReactNode
}): React.JSX.Element {
	const selectCtx = useContext(SelectContext)

	return (
		<SelectPrimitive.Trigger
			className={cn(
				'relative flex h-14 w-full border-b border-b-[#6b5a4a] text-inherit ring-offset-background transition-all placeholder:text-muted-foreground focus-within:border-b-2 focus-within:border-b-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
				className,
			)}
			{...props}
		>
			<div className="flex h-10 w-full items-center justify-between self-end">
				<div className="text-xl">{children}</div>
				<SelectPrimitive.Icon asChild>
					<ChevronDown className="h-4 w-4 opacity-50" />
				</SelectPrimitive.Icon>
				<div
					className={cn(
						'pointer-events-none absolute left-0 whitespace-nowrap text-muted-foreground transition-all',
						{
							'-top-1 text-base': !!selectCtx,
							'top-0 text-xl': !selectCtx,
						},
					)}
				>
					{label}
				</div>
			</div>
		</SelectPrimitive.Trigger>
	)
}

export function SelectScrollUpButton({
	className,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>): React.JSX.Element {
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}
		>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	)
}

export function SelectScrollDownButton({
	className,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>): React.JSX.Element {
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}
		>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	)
}

export function SelectContent({
	children,
	className,
	position = 'popper',
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>): React.JSX.Element {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				className={cn(
					'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border bg-card text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

export function SelectLabel({
	className,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>): React.JSX.Element {
	return (
		<SelectPrimitive.Label
			className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
			{...props}
		/>
	)
}

export function SelectItem({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>): React.JSX.Element {
	return (
		<SelectPrimitive.Item
			className={cn(
				'relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</SelectPrimitive.ItemIndicator>
			</span>

			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

export function SelectSeparator({
	className,
	...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>): React.JSX.Element {
	return (
		<SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
	)
}
