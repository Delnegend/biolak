'use client'
import { CircleMinus, CirclePlus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TextInput } from '@/components/ui/text-input'
import { BasicProductInCart, useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { CheckoutPageGlobal } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

function Title({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<'h3'>): React.JSX.Element {
	return (
		<h3 className={cn('font-sans text-xl font-bold leading-8', className)} {...props}>
			{children}
		</h3>
	)
}

function Card({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <div className="flex flex-col gap-y-9 bg-white p-6">{children}</div>
}

type BasicProductInCheckout = Omit<BasicProductInCart, 'checked'>

function CustomizedCheckbox({
	classNames,
	label,
	id,
}: {
	classNames?: {
		container?: string
		checkbox?: string
		label?: string
	}
	label: string
	id: string
}): React.JSX.Element {
	return (
		<div className={cn('mt-4 flex items-center gap-x-3', classNames?.container)}>
			<Checkbox id={id} className={classNames?.checkbox} />
			<label htmlFor={id} className={cn('text-xl text-muted-foreground', classNames?.label)}>
				{label}
			</label>
		</div>
	)
}

export default function PageClient({
	global,
	overrideProduct,
}: {
	global: CheckoutPageGlobal
	overrideProduct?: Omit<BasicProductInCheckout, 'quantity'> | null
}): React.JSX.Element {
	const { cart, loadProduct, unloadProduct, removeProduct } = useCartManager({
		syncWithLocalStorage: !overrideProduct,
	})
	const { lang: locale } = useClientLang()

	useEffect(() => {
		if (overrideProduct)
			loadProduct({
				slug: overrideProduct.slug,
				title: overrideProduct.title,
				variant: overrideProduct.variant,
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (cart.length === 0) {
		return (
			<div className="flex flex-col gap-10">
				<h2>
					{matchLang({
						[Lang.English]: 'Your cart is empty.',
						[Lang.Vietnamese]: 'Giỏ hàng của bạn đang trống.',
					})({ locale })}
				</h2>
				<Button tabIndex={-1} className="w-fit">
					{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
					<a href="/">
						{matchLang({
							[Lang.English]: 'Go to home page',
							[Lang.Vietnamese]: 'Về trang chủ',
						})({ locale })}
						&nbsp;
					</a>
				</Button>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-[2fr_1fr] gap-x-5">
			<div className="flex flex-col gap-y-5">
				<Card>
					<Title>{global.contacts.title}</Title>
					<div>
						<TextInput label={global.contacts.emailInputLabel} />
						<CustomizedCheckbox id="newsletter" label={global.contacts.acceptNewsletter} />
					</div>
					<Title>{global.address.title}</Title>
					<div className="grid grid-cols-2 gap-x-6 gap-y-9">
						<TextInput size="sm" label={global.address.nameInputLabel} />
						<TextInput size="sm" label={global.address.phoneInputLabel} />
						<TextInput size="sm" label={global.address.provinceCityInputLabel} />
						<TextInput size="sm" label={global.address.districtInputLabel} />
						<TextInput size="sm" label={global.address.wardInputLabel} />
						<TextInput size="sm" label={global.address.details} />
						<CustomizedCheckbox
							id="saveForNextTime"
							label={global.address.saveForNextTime}
							classNames={{ container: 'col-span-2' }}
						/>
					</div>
				</Card>

				<Card>
					<Title>{global.shipping.title}</Title>
					<div>
						<CustomizedCheckbox
							id="standardShipping"
							label={global.shipping.standardShippingLabel}
						/>
						<CustomizedCheckbox id="fastShipping" label={global.shipping.fastShippingLabel} />
					</div>
				</Card>

				<Card>
					<Title>{global.payment.title}</Title>
					<div>
						<CustomizedCheckbox id="cod" label={global.payment.codLabel} />
						<CustomizedCheckbox id="bankTransfer" label={global.payment.bankTransferLabel} />
					</div>
				</Card>

				<Card>
					<Title>{global.gift.title}</Title>
					<div className="grid grid-cols-2 gap-x-6 gap-y-3">
						<TextInput size="sm" label={global.gift.senderInputLabel} />
						<TextInput size="sm" label={global.gift.recipientInputLabel} />
						<TextInput
							size="sm"
							classNames={{
								container: 'col-span-2',
							}}
							label={global.gift.messageInputLabel}
						/>
					</div>
				</Card>
			</div>

			<Card>
				<Title>{global.order.title}</Title>
				<div>
					{cart.map((p) => {
						return (
							<div
								key={p.slug}
								className="grid grid-cols-[4rem_1fr_1fr_1fr_1f]"
								style={{
									gridTemplateAreas: `"icon title title title remove"
																				"icon reduce count add price"`,
								}}
							>
								<Image
									src="https://placehold.co/200x200"
									alt={matchLang({
										[Lang.English]: 'Product icon of ' + p.title,
										[Lang.Vietnamese]: 'Biểu tượng sản phẩm ' + p.title,
									})({ locale })}
									width={200}
									height={200}
									unoptimized={true}
									className="h-full w-8 object-contain"
									style={{ gridArea: 'icon' }}
								/>
								<Title style={{ gridArea: 'title' }}>{p.title}</Title>
								<button
									aria-label={matchLang({
										[Lang.English]: `Remove ${p.title} from cart`,
										[Lang.Vietnamese]: `Xoá ${p.title} khỏi giỏ hàng`,
									})({ locale })}
									onClick={() => removeProduct(p.slug)}
								>
									<X style={{ gridArea: 'remove' }} className="justify-self-end" />
								</button>

								<button
									aria-label={matchLang({
										[Lang.English]: `Reduce ${p.title} amount to ${p.quantity - 1}`,
										[Lang.Vietnamese]: `Giảm số lượng ${p.title} còn ${p.quantity - 1}`,
									})({ locale })}
									onClick={() => {
										if (p.quantity > 1) unloadProduct(p, 1)
									}}
									disabled={p.quantity <= 1}
								>
									<CircleMinus style={{ gridArea: 'reduce' }} />
								</button>

								<button
									aria-label={matchLang({
										[Lang.English]: `Increase ${p.title} amount to ${p.quantity + 1}`,
										[Lang.Vietnamese]: `Tăng số lượng ${p.title} lên ${p.quantity + 1}`,
									})({ locale })}
									onClick={() => loadProduct(p, 1)}
								>
									<CirclePlus style={{ gridArea: 'add' }} />
								</button>

								<div style={{ gridArea: 'count' }}>{p.quantity}</div>
								<div style={{ gridArea: 'price' }} className="justify-self-end">
									{formatPrice(p.variant.price)}
								</div>
							</div>
						)
					})}
				</div>
			</Card>
		</div>
	)
}
