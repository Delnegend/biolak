'use client'

import React, { useState } from 'react'

import { CartListClient } from '@/components/CartList.client'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

function CartContentWithData(): React.JSX.Element {
	const { cart, uncheckAll } = useCartManager({
		syncWithLocalStorage: true,
	})
	const { lang: locale } = useClientLang()

	return (
		<div className="flex h-[calc(100%-6rem)] flex-col justify-between gap-10">
			<CartListClient />

			<SheetFooter>
				<div
					className="grid w-full grid-cols-2"
					style={{
						gridTemplateAreas: `"clear clear"
																"hr hr"
																"sum checkout"
																"price checkout"`,
					}}
				>
					<button
						style={{ gridArea: 'clear' }}
						className="hover-underline-animation ml-auto flex w-fit justify-end font-bold"
						onClick={uncheckAll}
					>
						{matchLang({
							[Lang.English]: 'Unselect all',
							[Lang.Vietnamese]: 'Bỏ chọn tất cả',
						})(locale)}
					</button>

					<hr style={{ gridArea: 'hr' }} className="my-6 border-border" />

					<div style={{ gridArea: 'sum' }} className="text-base">
						{matchLang({
							[Lang.English]: 'Total',
							[Lang.Vietnamese]: 'Tạm tính',
						})(locale)}
					</div>

					<div style={{ gridArea: 'price' }} className="text-[1.75rem] font-semibold">
						{formatPrice(
							cart
								.filter((item) => item.checked)
								.map((item) => item.variant.price * item.quantity)
								.reduce((prev, curr) => prev + curr, 0),
						)}
					</div>

					<Button style={{ gridArea: 'checkout' }} size="lg" className="px-0" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/checkout">
							{matchLang({
								[Lang.English]: 'Checkout',
								[Lang.Vietnamese]: 'Thanh toán',
							})(locale)}
						</a>
					</Button>
				</div>
			</SheetFooter>
		</div>
	)
}

function CartContentWithoutData(): React.JSX.Element {
	const { lang: locale } = useClientLang()

	return (
		<div className="flex h-[calc(100%-6rem)] flex-col items-center justify-center gap-4">
			<h2 className="font-serif text-[2.5rem] font-semibold text-muted-foreground">
				{matchLang({
					[Lang.English]: 'Peek-a-boo...',
					[Lang.Vietnamese]: 'Ú òa...',
				})(locale)}
			</h2>
			<div className="text-balance text-center text-2xl text-[#271D13]">
				{matchLang({
					[Lang.English]: 'Your cart is empty',
					[Lang.Vietnamese]: 'Hiện không có sản phẩm nào trong giỏ của bạn',
				})(locale)}
			</div>
		</div>
	)
}

export function INTERNAL_CartSidebar({
	label,
	locale,
}: {
	label?: string
	locale: Lang
}): React.JSX.Element {
	const { cart } = useCartManager({
		syncWithLocalStorage: true,
	})
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="default"
					className="relative h-14 rounded-full bg-primary px-6 font-sans text-xl font-medium"
					hideArrow
				>
					{label ??
						matchLang({ [Lang.English]: 'Cart', [Lang.Vietnamese]: 'Giỏ hàng' })(locale)}
					{cart.length > 0 && (
						<div className="absolute -top-2 right-0 flex aspect-square size-7 items-center justify-center overflow-hidden rounded-full bg-[#FF8200] text-base text-primary">
							{cart.map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0)}
						</div>
					)}
				</Button>
			</SheetTrigger>

			<SheetContent className="!max-w-[31.25rem] p-10" side="right">
				<SheetHeader>
					<SheetTitle className="mb-14 !text-4xl">
						{matchLang({
							[Lang.English]: 'Your cart',
							[Lang.Vietnamese]: 'Giỏ hàng của bạn',
						})(locale)}
					</SheetTitle>
				</SheetHeader>
				{cart.length > 0 ? <CartContentWithData /> : <CartContentWithoutData />}
			</SheetContent>
		</Sheet>
	)
}
