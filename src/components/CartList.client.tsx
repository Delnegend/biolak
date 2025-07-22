'use client'

import { X } from 'lucide-react'
import { Phudu } from 'next/font/google'
import Link from 'next/link'

import { ProductInCart, useCartManager } from '@/hooks/useCartManager'
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

function CartItem({
	productInCart,
	showCheckbox,
	locale,
	syncWithLocalStorage,
}: {
	productInCart: ProductInCart
	showCheckbox: boolean
	locale: Lang
	syncWithLocalStorage?: boolean
}): React.JSX.Element {
	const { removeProduct, toggleCheck, loadProduct, unloadProduct } = useCartManager({
		syncWithLocalStorage,
		locale,
	})

	return (
		<div
			className={cn('grid items-center gap-x-3 gap-y-2', {
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
					aria-checked={productInCart.checked}
					checked={productInCart.checked}
					onCheckedChange={(checked) =>
						toggleCheck({
							productId: productInCart.product.id,
							variantSku: productInCart.variant.sku,
							checked: !!checked,
						})
					}
				/>
			)}
			<Link href={`/product/${productInCart.product.slug}`} style={{ gridArea: 'img' }}>
				<HeadlessImage
					media={productInCart.variant.image}
					alt={matchLang({
						[Lang.English]: `${productInCart.product.title}'s image`,
						[Lang.Vietnamese]: `Ảnh ${productInCart.product.title}`,
					})(locale)}
					placeholder={{ width: 100, height: 100 }}
					className="size-[3.75rem] rounded-lg object-cover"
				/>
			</Link>
			<Link
				href={`/product/${productInCart.product.slug}`}
				style={{ gridArea: 'title' }}
				className="text-lg font-semibold text-primary"
			>
				{productInCart.product.title}
			</Link>
			<button
				style={{ gridArea: 'remove' }}
				className="place-self-end self-start text-primary"
				onClick={(e) => {
					e.preventDefault()
					removeProduct({
						productId: productInCart.product.id,
						variantSku: productInCart.variant.sku,
					})
				}}
				aria-label={matchLang({
					[Lang.English]: `Remove ${productInCart.product.title} (${productInCart.variant.title}) from cart`,
					[Lang.Vietnamese]: `Xoá ${productInCart.product.title} (${productInCart.variant.title}) khỏi giỏ hàng`,
				})(locale)}
			>
				<X />
			</button>
			<div
				style={{ gridArea: 'quantity' }}
				className="flex h-5 w-[6.6rem] items-center justify-between self-start border"
			>
				<button
					className="flex aspect-square size-5 items-center justify-center border-r"
					onClick={(e) => {
						e.preventDefault()
						unloadProduct({
							productId: productInCart.product.id,
							variantSku: productInCart.variant.sku,
						})
					}}
					aria-label={matchLang({
						[Lang.English]: `Decrease quantity of ${productInCart.product.title} (${productInCart.variant.title})`,
						[Lang.Vietnamese]: `Giảm số lượng ${productInCart.product.title} (${productInCart.variant.title})`,
					})(locale)}
				>
					-
				</button>
				<span className="text-sm">{productInCart.quantity}</span>
				<button
					className="flex aspect-square size-5 items-center justify-center border-l"
					onClick={(e) => {
						e.preventDefault()
						loadProduct(productInCart)
					}}
					aria-label={matchLang({
						[Lang.English]: `Increase quantity of ${productInCart.product.title} (${productInCart.variant.title})`,
						[Lang.Vietnamese]: `Tăng số lượng ${productInCart.product.title} (${productInCart.variant.title})`,
					})(locale)}
				>
					+
				</button>
			</div>
			<div
				style={{ gridArea: 'price' }}
				className={cn(
					'place-self-end self-start text-lg font-semibold text-primary',
					phudu.className,
				)}
			>
				{formatPrice(productInCart.variant.price ?? 0)}
			</div>
		</div>
	)
}

export function CartListClient({
	className,
	showCheckbox,
	locale,
	syncWithLocalStorage,
}: {
	showCheckbox: boolean
	className?: string
	locale: Lang
	syncWithLocalStorage: boolean
}): React.JSX.Element {
	const { cart } = useCartManager({
		syncWithLocalStorage,
		locale,
	})

	return (
		<div className={cn('flex flex-col gap-5', className)}>
			{(showCheckbox ? cart : cart.filter((item) => item.checked)).map((item) => (
				<CartItem
					key={`${item.product.id}-${item.variant.sku}`}
					productInCart={item}
					showCheckbox={showCheckbox}
					locale={locale}
					syncWithLocalStorage={syncWithLocalStorage}
				/>
			))}
		</div>
	)
}
