'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'

export function Pagination(props: {
	className?: string
	page: number
	totalPages: number
}): React.JSX.Element {
	const router = useRouter()

	const hasNextPage = props.page < props.totalPages
	const hasPrevPage = props.page > 1

	const hasExtraPrevPages = props.page - 1 > 1
	const hasExtraNextPages = props.page + 1 < props.totalPages

	return (
		<div className={cn('my-12', props.className)}>
			<PaginationComponent>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							disabled={!hasPrevPage}
							onClick={() => {
								router.push(`/posts/page/${props.page - 1}`)
							}}
						/>
					</PaginationItem>

					{hasExtraPrevPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{hasPrevPage && (
						<PaginationItem>
							<PaginationLink
								onClick={() => {
									router.push(`/posts/page/${props.page - 1}`)
								}}
							>
								{props.page - 1}
							</PaginationLink>
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationLink
							isActive
							onClick={() => {
								router.push(`/posts/page/${props.page}`)
							}}
						>
							{props.page}
						</PaginationLink>
					</PaginationItem>

					{hasNextPage && (
						<PaginationItem>
							<PaginationLink
								onClick={() => {
									router.push(`/posts/page/${props.page + 1}`)
								}}
							>
								{props.page + 1}
							</PaginationLink>
						</PaginationItem>
					)}

					{hasExtraNextPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationNext
							disabled={!hasNextPage}
							onClick={() => {
								router.push(`/posts/page/${props.page + 1}`)
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationComponent>
		</div>
	)
}
