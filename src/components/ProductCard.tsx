import { CirclePlus } from 'lucide-react'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { cn } from '@/utilities/ui'

import { Button } from './ui/button'

const lato = Lato({
	weight: ['400'],
})

export function ProductCard({
	product: p,
	component,
}: {
	product: Product
	component?: React.ElementType
}): React.JSX.Element {
	const Comp = component ?? 'div'
	const img = p.gallery?.[0] && typeof p.gallery[0] === 'object' ? p.gallery[0] : null

	return (
		<Comp
			key={p.id}
			className="grid max-w-96 grid-cols-[1fr_auto] grid-rows-[auto]"
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
					unoptimized={img === null}
					className="mb-6 rounded-[0.5rem]"
				/>
			</Link>
			<Link
				href={p.slug ? `/product/${p.slug}` : '#'}
				style={{ gridArea: 'title' }}
				className="mb-2 text-lg font-bold"
			>
				{`${p.title} →`}
			</Link>
			<div
				style={{ gridArea: 'desc' }}
				className={cn('mb-[1.375rem] text-xs uppercase', lato.className)}
			>
				{p.shortDescription}
			</div>
			<div style={{ gridArea: 'price' }}>{formatPrice(p.price)}</div>
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
