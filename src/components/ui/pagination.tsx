import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export function Pagination({
	className,
	...props
}: React.ComponentPropsWithRef<'nav'>): React.JSX.Element {
	return (
		<nav
			aria-label="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			role="navigation"
			{...props}
		/>
	)
}

export function PaginationContent({
	className,
	...props
}: React.ComponentPropsWithRef<'ul'>): React.JSX.Element {
	return <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

export function PaginationItem({
	className,
	...props
}: React.ComponentPropsWithRef<'li'>): React.JSX.Element {
	return <li className={cn('', className)} {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<'button'>

export function PaginationLink({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps): React.JSX.Element {
	return (
		<button
			aria-current={isActive ? 'page' : undefined}
			className={cn(
				buttonVariants({
					size,
					variant: isActive ? 'outline' : 'ghost',
				}),
				className,
			)}
			{...props}
		/>
	)
}

export function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>): React.JSX.Element {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			className={cn('gap-1 pl-2.5', className)}
			size="default"
			{...props}
		>
			<ChevronLeft className="h-4 w-4" />
			<span>Previous</span>
		</PaginationLink>
	)
}

export function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>): React.JSX.Element {
	return (
		<PaginationLink
			aria-label="Go to next page"
			className={cn('gap-1 pr-2.5', className)}
			size="default"
			{...props}
		>
			<span>Next</span>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	)
}

export function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>): React.JSX.Element {
	return (
		<span
			aria-hidden
			className={cn('flex h-9 w-9 items-center justify-center', className)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More pages</span>
		</span>
	)
}
