'use client'
import { Button } from '@/components/ui/button'
import { useCarousel } from '@/components/ui/carousel'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProductsCarouselNavButton({
  direction,
  className,
}: {
  className?: string
  direction: 'next' | 'previous'
}): React.JSX.Element {
  const { scrollNext, scrollPrev } = useCarousel()

  return (
    <Button
      onClick={direction === 'next' ? scrollNext : scrollPrev}
      className={cn('mx-auto grid size-16 grid-cols-1 p-0 [&>svg]:place-self-center', className)}
      hideArrow
    >
      {direction === 'next' ? <ChevronRight color="white" /> : <ChevronLeft color="white" />}
    </Button>
  )
}
