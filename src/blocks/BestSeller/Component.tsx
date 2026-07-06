import config from '@payload-config'
import { Phudu } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'

import { ProductsSlug } from '@/collections/Products/slug'
import { CMSLink } from '@/components/CMSLink'
import { ProductCard } from '@/components/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Lang } from '@/i18n/routing'
import { BestSellerBlockProps } from '@/payload-types'
import { arrayDepthHandler } from '@/utilities/depthHandler'
import { newLogger } from '@/utilities/logger'
import { cn } from '@/utilities/ui'

const logger = newLogger('blocks/BestSeller')

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: '500',
})

export async function BestSellerBlock({
	locale,
	...props
}: BestSellerBlockProps & {
	locale: Lang
}): Promise<React.JSX.Element> {
	const [t, payload] = await Promise.all([
		getTranslations({ locale, namespace: 'blocks.bestSeller' }),
		getPayload({ config }),
	])
	const {
		data: products,
		ok: productsOk,
		error: productsError,
	} = await arrayDepthHandler({
		data: props.products,
		fetch: async (ids) =>
			payload
				.find({
					collection: ProductsSlug,
					where: {
						id: {
							in: ids,
						},
					},
					pagination: false,
					limit: 20,
				})
				.then((res) => res.docs),
	})
	if (!productsOk) {
		logger.error("Can't fetching products:", productsError)
	}

	return (
		<div className="safe-width my-[2.5rem] flex flex-col items-center gap-[2.5rem] lg:my-24 lg:flex-row lg:items-end lg:gap-16">
			<div className="flex h-full flex-col justify-end lg:max-w-[40rem] lg:gap-9">
				<div className="font-serif text-[2.5rem] font-semibold italic leading-[3.5rem] text-primary lg:text-7xl">
					{props.title ?? t('title')}
				</div>
				{props.description && (
					<div className="text-balance text-primary opacity-60 max-lg:hidden">
						{props.description}
					</div>
				)}
				<CMSLink
					{...props.link}
					type={props.link?.type ?? undefined}
					label={props.link?.label ?? t('viewAllProductsButton')}
					className={cn(
						'text-xl font-medium leading-8 text-[#703D00] max-lg:hidden',
						phudu.className,
					)}
				/>
			</div>

			<Carousel opts={{ dragFree: true }} className="max-lg:w-full">
				<CarouselContent>
					{products?.map((p) => (
						<ProductCard product={p} key={p.id} component={CarouselItem} />
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
