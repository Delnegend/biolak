import { Phudu } from 'next/font/google'
import Link from 'next/link'

import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ProductsCategoryBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
})

export function ProductsCategoryBlock(props: ProductsCategoryBlockProps): React.JSX.Element {
	const category = typeof props.category.value === 'object' ? props.category.value : null

	const products =
		props.products && typeof props.products === 'object'
			? props.products.map((p) => p.product).filter((p) => typeof p === 'object' && p !== null)
			: null

	return (
		<div className="safe-width flex h-[48rem] flex-row items-center justify-between text-primary">
			<div className="just flex h-96 w-[40rem] flex-col justify-between pr-24">
				<div className="font-serif text-7xl font-semibold italic">{category?.title}</div>
				<div className={cn('text-xl font-medium leading-8', phudu.className)}>
					<Link
						className="underline-offset-4 hover:underline"
						href={category?.slug ? `/category/${category.slug}` : '#'}
					>
						{props.buttonLabel} →
					</Link>
				</div>
			</div>
			<Carousel opts={{ dragFree: true }}>
				<CarouselContent>
					{products?.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
