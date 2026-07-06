'use client'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
import { formatPrice } from '@/utilities/formatPrice'
import { cn } from '@/utilities/ui'

export function INTERNAL_CartSidebar({
	label,
	size = 'lg',
}: {
	label?: string
	size?: 'lg' | 'sm'
}): React.JSX.Element {
	const t = useTranslations('globals.header.nav.cart')
	const syncWithLocalStorage = true

	const { cart, uncheckAll } = useCartManager({
		syncWithLocalStorage,
	})
	const [open, setOpen] = useState(false)
	const cartProductCount = cart
		.map((item) => item.quantity)
		.reduce((prev, curr) => prev + curr, 0)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant={size === 'lg' ? 'default' : 'outline'}
					className={cn('relative h-14 font-sans font-medium', {
						'rounded-full bg-primary px-6 font-sans text-xl font-medium': size === 'lg',
						'w-14 border border-transparent bg-transparent text-base text-primary hover:border-primary hover:bg-transparent':
							size === 'sm',
					})}
					hideArrow
				>
					<span className={cn(size === 'sm' && 'hidden')}>{label ?? t('trigger')}</span>
					<span className={cn(size === 'lg' && 'hidden')}>
						<span className="sr-only">{t('trigger')}</span>
						<ShoppingCart />
					</span>

					{cartProductCount > 0 && size === 'lg' && (
						<div className="absolute -top-2 right-0 flex aspect-square size-7 items-center justify-center overflow-hidden rounded-full bg-[#FF8200] text-base text-primary">
							{cartProductCount}
						</div>
					)}
				</Button>
			</SheetTrigger>

			<SheetContent className="!max-w-[31.25rem] p-10 max-md:w-full" side="right">
				<SheetHeader>
					<SheetTitle className="mb-14 text-left !text-4xl">{t('title')}</SheetTitle>
				</SheetHeader>
				{cart.length > 0 ? (
					<div className="flex h-[calc(100%-6rem)] flex-col justify-between gap-10">
						<CartListClient
							showCheckbox={true}
							syncWithLocalStorage={syncWithLocalStorage}
						/>

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
									{t('unselectAll')}
								</button>

								<hr style={{ gridArea: 'hr' }} className="my-6 border-border" />

								<div style={{ gridArea: 'sum' }} className="text-base">
									{t('total')}
								</div>

								<div
									style={{ gridArea: 'price' }}
									className="text-[1.75rem] font-semibold"
								>
									{formatPrice(
										cart
											.filter((item) => item.checked)
											.map((item) => item.variant.price * item.quantity)
											.reduce((prev, curr) => prev + curr, 0),
									)}
								</div>

								<Button
									style={{ gridArea: 'checkout' }}
									size="lg"
									className="px-0"
									asChild
								>
									{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
									<a href="/checkout">{t('checkout')}</a>
								</Button>
							</div>
						</SheetFooter>
					</div>
				) : (
					<div className="flex h-[calc(100%-6rem)] flex-col items-center justify-center gap-4">
						<h2 className="font-serif text-[2.5rem] font-semibold text-muted-foreground">
							{t('empty.title')}
						</h2>
						<div className="text-balance text-center text-2xl text-[#271D13]">
							{t('empty.description')}
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
