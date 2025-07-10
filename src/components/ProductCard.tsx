import Link from 'next/link'

import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getPriceRange } from '@/utilities/getPriceRange'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { HeadlessImage } from './Media/HeadlessImage'
import { INTERNAL_ProductCardAddToCart } from './ProductCardAddToCart.client'

export async function ProductCard({
	product: p,
	size = 'lg',
	component,
}: {
	product: {
		id: Product['id']
		title: Product['title']
		slug?: Product['slug']
		shortDescription?: Product['shortDescription']
		gallery?: Product['gallery']
		variants: Array<{
			sku: Product['variants'][number]['sku']
			title: Product['variants'][number]['title']
			price: Product['variants'][number]['price']
			image?: Product['variants'][number]['image']
			stock: Product['variants'][number]['stock']
		}>
	}
	size?: 'lg' | 'sm'
	component?: React.ElementType
}): Promise<React.JSX.Element> {
	const Comp = component ?? 'div'
	const locale = await getClientLang()
	const priceRange = getPriceRange(p)

	return (
		<Comp
			key={p.id}
			className={cn(
				'grid grid-cols-[1fr_auto] grid-rows-[auto]',
				size === 'lg' ? 'max-w-96' : 'max-w-72',
			)}
			style={{
				gridTemplateAreas: `"img img"
											"title add-to-cart"
											"${p.shortDescription ? 'desc' : '.'} add-to-cart"
											"price add-to-cart"`,
			}}
		>
			<Link href={p.slug ? `/product/${p.slug}` : '#'} style={{ gridArea: 'img' }}>
				<HeadlessImage
					media={p.gallery?.[0]}
					alt={matchLang({
						[Lang.English]: 'Product image',
						[Lang.Vietnamese]: 'Hình ảnh sản phẩm',
					})(locale)}
					placeholder={{ width: 1000, height: 1000 }}
					style={{ gridArea: 'img' }}
					className={cn(
						'mb-6 rounded-[0.5rem] object-cover',
						size === 'lg' ? 'h-[28.75rem]' : 'h-[25.875rem]',
					)}
				/>
			</Link>
			<Link
				href={p.slug ? `/product/${p.slug}` : '#'}
				style={{ gridArea: 'title' }}
				className="mb-2 text-lg font-bold"
			>
				{`${p.title} →`}
			</Link>
			{p.shortDescription && (
				<div style={{ gridArea: 'desc' }} className="mb-[1.375rem] text-xs uppercase">
					{p.shortDescription}
				</div>
			)}
			<div style={{ gridArea: 'price' }}>
				{!!priceRange
					? priceRange
					: matchLang({
							[Lang.English]: 'Out of stock',
							[Lang.Vietnamese]: 'Hết hàng',
						})(locale)}
			</div>
			<div style={{ gridArea: 'add-to-cart' }}>
				<INTERNAL_ProductCardAddToCart
					product={{
						id: p.id,
						title: p.title,
					}}
					priceRange={priceRange}
					variants={p.variants}
				/>
			</div>
		</Comp>
	)
}
