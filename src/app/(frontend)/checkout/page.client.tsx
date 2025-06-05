'use client'
import { ArrowRight, ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { CartListClient } from '@/components/CartList.client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TextInput } from '@/components/ui/text-input'
import { BasicProductInCart, useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { CheckoutPageGlobal } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import CITY_DISTRICT_WARD from './actions/city-district-ward.json'

function Title({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<'h3'>): React.JSX.Element {
	return (
		<h3
			className={cn('font-sans text-xl font-bold leading-8 text-primary', className)}
			{...props}
		>
			{children}
		</h3>
	)
}

function Card({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<div className="flex flex-col gap-y-4 rounded-xl bg-white p-6 text-primary">{children}</div>
	)
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

function CartListWithAccordion(): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const [open, setOpen] = useState(false)

	return (
		<div>
			<div
				className={cn('grid transition-all', {
					'grid-rows-[1fr]': open,
					'grid-rows-[0fr]': !open,
				})}
			>
				<CartListClient showCheckbox={false} className="mb-4 min-h-0 overflow-hidden" />
			</div>

			<button
				className="!flex w-full flex-row items-center justify-between font-sans text-xl"
				aria-label={matchLang({
					[Lang.English]: 'Toggle cart details',
					[Lang.Vietnamese]: 'Ẩn hiện chi tiết giỏ hàng',
				})({ locale })}
				onClick={() => setOpen((prev) => !prev)}
			>
				{matchLang({
					[Lang.English]: open ? 'Hide details' : 'Cart details',
					[Lang.Vietnamese]: open ? 'Ẩn chi tiết' : 'Chi tiết giỏ hàng',
				})({ locale })}
				<ChevronDown
					className={cn('transition-all', {
						'rotate-180': open,
						'rotate-0': !open,
					})}
				/>
			</button>
		</div>
	)
}

function OrderSummary({
	cart,
	global,
}: {
	cart: BasicProductInCart[]
	global: CheckoutPageGlobal
}): React.JSX.Element {
	const provisional = cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0)

	return (
		<div>
			<div className="grid grid-cols-[auto_1fr] gap-2">
				<div className="font-bold">{global.orderSummary.provisional}</div>
				<div className="place-self-end">{formatPrice(provisional)}</div>
				<div className="font-bold">{global.orderSummary.shipping}</div>
				<div className="place-self-end">{formatPrice(0)}</div>
				<div className="font-bold">{global.orderSummary.discount}</div>
				<div className="place-self-end">{formatPrice(0)}</div>
				<div className="font-bold">{global.orderSummary.total}</div>
				<div className="place-self-end">{formatPrice(provisional)}</div>
			</div>
			<ul className="my-6 text-balance italic">
				<li>{global.orderSummary.acknowledgment}</li>
			</ul>
			<Button size="md" className="h-14 w-full" hideArrow>
				{global.orderSummary.orderButtonLabel}
			</Button>
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
	const { cart, loadedFromLocalStorageDone, loadProduct } = useCartManager({
		syncWithLocalStorage: !overrideProduct,
	})
	const { lang: locale } = useClientLang()

	const [selectedCity, setSelectedCity_] = useState<string | undefined>(undefined)
	function setSelectedCity(city: string | undefined): void {
		setSelectedDistrict(undefined)
		setSelectedCity_(city)
		const inputElem = document.getElementById('provinceCity') as HTMLInputElement
		if (inputElem) inputElem.value = city ?? ''
	}
	const [selectedDistrict, setSelectedDistrict_] = useState<string | undefined>(undefined)
	function setSelectedDistrict(district: string | undefined): void {
		setSelectedWard(undefined)
		setSelectedDistrict_(district)
		const inputElem = document.getElementById('district') as HTMLInputElement
		if (inputElem) inputElem.value = district ?? ''
	}
	const [selectedWard, setSelectedWard_] = useState<string | undefined>(undefined)
	function setSelectedWard(ward: string | undefined): void {
		setSelectedWard_(ward)
		const inputElem = document.getElementById('ward') as HTMLInputElement
		if (inputElem) inputElem.value = ward ?? ''
	}

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
						[Lang.English]: loadedFromLocalStorageDone
							? 'Your cart is empty.'
							: 'Loading your cart...',
						[Lang.Vietnamese]: loadedFromLocalStorageDone
							? 'Giỏ hàng của bạn đang trống.'
							: 'Đang tải giỏ hàng của bạn...',
					})({ locale })}
				</h2>
				{loadedFromLocalStorageDone && (
					<Button className="w-fit" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/">
							{matchLang({
								[Lang.English]: 'Go to home page',
								[Lang.Vietnamese]: 'Về trang chủ',
							})({ locale })}
							&nbsp;
						</a>
						<ArrowRight />
					</Button>
				)}
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
						<input type="text" className="hidden" id="provinceCity" />
						<input type="text" className="hidden" id="district" />
						<input type="text" className="hidden" id="ward" />

						<Select value={selectedCity} onValueChange={setSelectedCity}>
							<SelectTrigger
								label={global.address.provinceCityInputLabel}
								aria-label={global.address.provinceCityInputLabel}
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(CITY_DISTRICT_WARD).map((city) => (
									<SelectItem key={city} value={city}>
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={selectedDistrict}
							onValueChange={setSelectedDistrict}
							disabled={!Boolean(selectedCity)}
						>
							<SelectTrigger
								label={global.address.districtInputLabel}
								aria-label={global.address.districtInputLabel}
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{/* @ts-expect-error - idc */}
								{Object.keys(selectedCity ? CITY_DISTRICT_WARD[selectedCity] : {}).map(
									(district) => (
										<SelectItem key={district} value={district}>
											{district}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
						<Select
							value={selectedWard}
							onValueChange={setSelectedWard}
							disabled={!Boolean(selectedDistrict) || !Boolean(selectedCity)}
						>
							<SelectTrigger
								label={global.address.wardInputLabel}
								aria-label={global.address.wardInputLabel}
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{(selectedCity && selectedDistrict
									? // @ts-expect-error - idc
										CITY_DISTRICT_WARD[selectedCity][selectedDistrict]
									: []
								).map((ward: string) => (
									<SelectItem key={ward} value={ward}>
										{ward}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

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
				<CartListWithAccordion />
				<hr />

				<Title>{global.discount.title}</Title>
				<div className="flex h-[4.5rem] items-center justify-between rounded-[0.5rem] border border-primary p-[0.625rem]">
					<input
						type="text"
						placeholder={global.discount.inputPlaceholder}
						aria-label={global.discount.inputPlaceholder}
						className="h-[calc(4.5rem-1.25rem)] w-full border-primary bg-transparent px-3 text-lg placeholder:text-muted-foreground focus:outline-none"
					/>
					<Button
						hideArrow
						aria-label={global.discount.applyButtonLabel}
						className="h-[calc(4.5rem-1.25rem)]"
						size="md"
					>
						{global.discount.applyButtonLabel}
					</Button>
				</div>
				<hr className="my-2" />

				<OrderSummary cart={cart} global={global} />
			</Card>
		</div>
	)
}
