'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utilities/ui'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean
}): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.SubTrigger
			className={cn(
				'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
				inset && 'pl-8',
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRight className="ml-auto" />
		</DropdownMenuPrimitive.SubTrigger>
	)
}
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

export function DropdownMenuSubContent({
	className,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.SubContent
			className={cn(
				'z-50 min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className,
			)}
			{...props}
		/>
	)
}
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

export function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				sideOffset={sideOffset}
				className={cn(
					'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	)
}
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export function DropdownMenuItem({
	className,
	inset,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean
}): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
				inset && 'pl-8',
				className,
			)}
			{...props}
		/>
	)
}
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			className={cn(
				'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	)
}
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

export function DropdownMenuRadioItem({
	className,
	children,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.RadioItem
			className={cn(
				'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<Circle className="h-2 w-2 fill-current" />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	)
}
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export function DropdownMenuLabel({
	className,
	inset,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean
}): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.Label
			className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
			{...props}
		/>
	)
}
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>): React.JSX.Element {
	return (
		<DropdownMenuPrimitive.Separator
			className={cn('-mx-1 my-1 h-px bg-muted', className)}
			{...props}
		/>
	)
}
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export function DropdownMenuShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
	)
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'
