'use client'

import { X } from 'lucide-react'
import { Phudu } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { Checkbox } from './ui/checkbox'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['400'],
})

export function CartListClient({
	showCheckbox = true,
	className,
}: {
	showCheckbox?: boolean
	className?: string
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const { cart, removeProduct, toggleCheck, loadProduct, unloadProduct } = useCartManager({
		syncWithLocalStorage: true,
	})

	return (
		<div className={cn('flex flex-col gap-5', className)}>
			{cart.map((item) => {
				const variantImg = typeof item.variant.image === 'object' ? item.variant.image : null
				return (
					<div
						key={`${item.slug}-${item.variant.sku}`}
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
										productSlug: item.slug,
										variantSku: item.variant.sku,
										checked: Boolean(checked),
									})
								}
							/>
						)}
						<Link href={`/product/${item.slug}`} style={{ gridArea: 'img' }}>
							<Image
								src={variantImg?.url ?? 'https://placehold.co/100x100'}
								alt={
									variantImg?.alt ??
									matchLang({
										[Lang.English]: `${item.variant.title}'s image`,
										[Lang.Vietnamese]: `Ảnh ${item.variant.title}`,
									})({ locale })
								}
								width={variantImg?.width ?? 100}
								height={variantImg?.height ?? 100}
								className="size-[3.75rem] rounded-lg object-cover"
								unoptimized={!variantImg}
							/>
						</Link>
						<Link
							href={`/product/${item.slug}`}
							style={{ gridArea: 'title' }}
							className="text-lg font-semibold text-primary"
						>
							{item.title}
						</Link>
						<button
							style={{ gridArea: 'remove' }}
							className="place-self-end self-start text-primary"
							onClick={() =>
								removeProduct({
									productSlug: item.slug,
									variantSku: item.variant.sku,
								})
							}
							aria-label={matchLang({
								[Lang.English]: `Remove ${item.title} (${item.variant.title}) from cart`,
								[Lang.Vietnamese]: `Xoá ${item.title} (${item.variant.title}) khỏi giỏ hàng`,
							})({ locale })}
						>
							<X />
						</button>
						<div
							style={{ gridArea: 'quantity' }}
							className="flex h-5 w-[6.6rem] items-center justify-between border"
						>
							<button
								className="flex aspect-square size-5 items-center justify-center border-r"
								onClick={() => unloadProduct(item)}
								aria-label={matchLang({
									[Lang.English]: `Decrease quantity of ${item.title} (${item.variant.title})`,
									[Lang.Vietnamese]: `Giảm số lượng ${item.title} (${item.variant.title})`,
								})({ locale })}
							>
								-
							</button>
							<span className="text-sm">{item.quantity}</span>
							<button
								className="flex aspect-square size-5 items-center justify-center border-l"
								onClick={() => loadProduct(item)}
								aria-label={matchLang({
									[Lang.English]: `Increase quantity of ${item.title} (${item.variant.title})`,
									[Lang.Vietnamese]: `Tăng số lượng ${item.title} (${item.variant.title})`,
								})({ locale })}
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
							{formatPrice(item.variant.price)}
						</div>
					</div>
				)
			})}
		</div>
	)
}
