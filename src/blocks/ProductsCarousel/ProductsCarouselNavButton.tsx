'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCarousel } from '@/components/ui/carousel'
import { cn } from '@/utilities/ui'

export function ProductsCarouselNavButton(props: {
	className?: string
	direction: 'next' | 'previous'
}): React.JSX.Element {
	const { scrollNext, scrollPrev } = useCarousel()

	return (
		<Button
			onClick={props.direction === 'next' ? scrollNext : scrollPrev}
			className={cn(
				'mx-auto grid size-16 grid-cols-1 p-0 [&>svg]:place-self-center',
				props.className,
			)}
			hideArrow
		>
			{props.direction === 'next' ? (
				<ChevronRight color="white" />
			) : (
				<ChevronLeft color="white" />
			)}
		</Button>
	)
}
