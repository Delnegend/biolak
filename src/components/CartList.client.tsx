'use client'

import { X } from 'lucide-react'
import { Phudu } from 'next/font/google'
import Link from 'next/link'

import { useCartManager } from '@/hooks/useCartManager'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { HeadlessImage } from './Media/HeadlessImage'
import { Checkbox } from './ui/checkbox'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['400'],
})

export function CartListClient({
	className,
	showCheckbox,
	locale,
}: {
	showCheckbox: boolean
	className?: string
	locale?: Lang
}): React.JSX.Element {
	const { cart, removeProduct, toggleCheck, loadProduct, unloadProduct } = useCartManager({
		syncWithLocalStorage: true,
	})

	return (
		<div className={cn('flex flex-col gap-5', className)}>
			{cart.map((item) => (
				<div
					key={`${item.product.id}-${item.variant.sku}`}
					className={cn('grid items-center gap-3', {
						'grid-cols-[auto_auto_1fr_auto]': showCheckbox,
						'grid-cols-[auto_1fr_auto]': !showCheckbox,
					})}
					style={{
						gridTemplateAreas: `"${showCheckbox ? 'select ' : ''}img title remove"
																"${showCheckbox ? 'select ' : ''}img quantity price"`,
					}}
				>
					{showCheckbox && (
						<Checkbox
							style={{ gridArea: 'select' }}
							className="place-self-center"
							aria-checked={item.checked}
							checked={item.checked}
							onCheckedChange={(checked) =>
								toggleCheck({
									productId: item.product.id,
									variantSku: item.variant.sku,
									checked: !!checked,
								})
							}
						/>
					)}
					<Link href={`/product/${item.product.slug}`} style={{ gridArea: 'img' }}>
						<HeadlessImage
							media={item.variant.image}
							alt={matchLang({
								[Lang.English]: `${item.product.title}'s image`,
								[Lang.Vietnamese]: `Ảnh ${item.product.title}`,
							})(locale)}
							placeholder={{ width: 100, height: 100 }}
							className="size-[3.75rem] rounded-lg object-cover"
						/>
					</Link>
					<Link
						href={`/product/${item.product.slug}`}
						style={{ gridArea: 'title' }}
						className="text-lg font-semibold text-primary"
					>
						{item.product.title}
					</Link>
					<button
						style={{ gridArea: 'remove' }}
						className="place-self-end self-start text-primary"
						onClick={() =>
							removeProduct({
								productId: item.product.id,
								variantSku: item.variant.sku,
							})
						}
						aria-label={matchLang({
							[Lang.English]: `Remove ${item.product.title} (${item.variant.title}) from cart`,
							[Lang.Vietnamese]: `Xoá ${item.product.title} (${item.variant.title}) khỏi giỏ hàng`,
						})(locale)}
					>
						<X />
					</button>
					<div
						style={{ gridArea: 'quantity' }}
						className="flex h-5 w-[6.6rem] items-center justify-between border"
					>
						<button
							className="flex aspect-square size-5 items-center justify-center border-r disabled:text-muted-foreground"
							onClick={(e) => {
								e.preventDefault()
								unloadProduct({
									productId: item.product.id,
									variantSku: item.variant.sku,
								})
							}}
							aria-label={matchLang({
								[Lang.English]: `Decrease quantity of ${item.product.title} (${item.variant.title})`,
								[Lang.Vietnamese]: `Giảm số lượng ${item.product.title} (${item.variant.title})`,
							})(locale)}
							disabled={item.quantity <= 1}
						>
							-
						</button>
						<span className="text-sm">{item.quantity}</span>
						<button
							className="flex aspect-square size-5 items-center justify-center border-l disabled:text-muted-foreground"
							onClick={(e) => {
								e.preventDefault()
								loadProduct(item)
							}}
							aria-label={matchLang({
								[Lang.English]: `Increase quantity of ${item.product.title} (${item.variant.title})`,
								[Lang.Vietnamese]: `Tăng số lượng ${item.product.title} (${item.variant.title})`,
							})(locale)}
							disabled={item.quantity >= (item.variant.stock ?? 0)}
						>
							+
						</button>
					</div>
					<div
						style={{ gridArea: 'price' }}
						className={cn(
							'place-self-end text-lg font-semibold text-primary',
							phudu.className,
						)}
					>
						{formatPrice(item.variant.price ?? 0)}
					</div>
				</div>
			))}
		</div>
	)
}
