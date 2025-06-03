import { CirclePlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { getPriceRange } from '@/utilities/getPriceRange'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { Button } from './ui/button'

export async function ProductCard({
	product: p,
	size = 'lg',
	component,
}: {
	product: {
		id: Product['id']
		title: Product['title']
		slug?: Product['slug']
		shortDescription: Product['shortDescription']
		gallery?: Product['gallery']
		variants: Array<{
			price: Product['variants'][number]['price']
			stock: Product['variants'][number]['stock']
		}>
	}
	size?: 'lg' | 'sm'
	component?: React.ElementType
}): Promise<React.JSX.Element> {
	const Comp = component ?? 'div'
	const img = p.gallery?.[0] && typeof p.gallery[0] === 'object' ? p.gallery[0] : null
	const locale = await getClientLang()

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
											"desc add-to-cart"
											"price add-to-cart"`,
			}}
		>
			<Link href={p.slug ? `/product/${p.slug}` : '#'} style={{ gridArea: 'img' }}>
				<Image
					src={img?.url ?? 'https://placehold.co/1000x1000'}
					alt={`Ảnh sản phẩm ${p.title}`}
					width={img?.width ?? 1000}
					height={img?.height ?? 1000}
					style={{ gridArea: 'img' }}
					unoptimized={!img}
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
			<div style={{ gridArea: 'desc' }} className="mb-[1.375rem] text-xs uppercase">
				{p.shortDescription}
			</div>
			<div style={{ gridArea: 'price' }}>
				{getPriceRange(p) ??
					matchLang({
						[Lang.English]: 'Out of stock',
						[Lang.Vietnamese]: 'Hết hàng',
					})({ locale })}
			</div>
			<div style={{ gridArea: 'add-to-cart' }}>
				<Button
					hideArrow={true}
					className="group flex size-12 items-center justify-center rounded-[0.5rem] border-[#E7B27E] bg-[#E7B27E] p-0 transition-all hover:border hover:bg-transparent"
					title="Thêm vào giỏ hàng"
				>
					<CirclePlus className="w-full transition-colors group-hover:text-[#E7B27E]" />
				</Button>
			</div>
		</Comp>
	)
}
