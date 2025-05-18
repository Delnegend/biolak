import configPromise from '@payload-config'
import { Phudu } from 'next/font/google'
import Link from 'next/link'
import { getPayload } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ProductsCategoryBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
})

export async function ProductsCategoryBlock(
	props: ProductsCategoryBlockProps,
): Promise<React.JSX.Element> {
	const category = typeof props.category.value === 'object' ? props.category.value : null

	const payload = await getPayload({ config: configPromise })
	let products
	try {
		products = await payload.find({
			collection: ProductsSlug,
			overrideAccess: false,
			where: {
				[`${ProductCategoriesSlug}.slug`]: {
					equals: category?.slug,
				},
			},
		})
	} catch (e) {
		throw new Error(
			`ProductsCategoryBlock: Error loading products for category ${category?.slug}: ${e}`,
		)
	}

	if (products.docs.length === 0) {
		try {
			products = await payload.find({
				collection: ProductsSlug,
				overrideAccess: false,
				where: {
					[`${ProductSubCategoriesSlug}.slug`]: {
						equals: category?.slug,
					},
				},
			})
		} catch (e) {
			throw new Error(
				`ProductsCategoryBlock: Error loading products for sub category ${category?.slug}: ${e}`,
			)
		}
	}

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
					{products.docs?.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
