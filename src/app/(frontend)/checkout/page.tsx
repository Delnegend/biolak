import { CircleMinus, CirclePlus, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { TextInput } from '@/components/ui/text-input'
import { CheckoutPageGlobalSlug } from '@/globals/CheckoutPage/config'
import { CheckoutPageGlobal } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

import PageClient from './page.client'

export async function generateStaticParams() {
	return {
		title: 'Thanh toán',
	}
}

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

function INTERNAL_Checkbox({
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

const mockCart = Array.from({ length: 3 }).map((_, i) => ({
	id: i,
	price: i * 100,
	name: `Tên sản phẩm ${i}`,
	amount: i * 10,
}))

export default async function Checkout(): Promise<React.JSX.Element> {
	const global = (await getCachedGlobal(CheckoutPageGlobalSlug, 1)()) as CheckoutPageGlobal

	return (
		<div className="safe-width mb-16">
			<PageClient />
			<Image
				src="https://placehold.co/128x64"
				width={1000}
				height={1000}
				alt="Brand Logo"
				className="my-16 h-16 w-32 overflow-hidden object-contain"
				unoptimized={true}
			/>
			<div className="grid grid-cols-[2fr_1fr] gap-x-5">
				<div className="flex flex-col gap-y-5">
					<Card>
						<Title>{global.contacts.title}</Title>
						<div>
							<TextInput label={global.contacts.emailInputLabel} />
							<INTERNAL_Checkbox id="newsletter" label={global.contacts.acceptNewsletter} />
						</div>
						<Title>{global.address.title}</Title>
						<div className="grid grid-cols-2 gap-x-6 gap-y-9">
							<TextInput size="sm" label={global.address.nameInputLabel} />
							<TextInput size="sm" label={global.address.phoneInputLabel} />
							<TextInput size="sm" label={global.address.provinceCityInputLabel} />
							<TextInput size="sm" label={global.address.districtInputLabel} />
							<TextInput size="sm" label={global.address.wardInputLabel} />
							<TextInput size="sm" label={global.address.details} />
							<INTERNAL_Checkbox
								id="saveForNextTime"
								label={global.address.saveForNextTime}
								classNames={{ container: 'col-span-2' }}
							/>
						</div>
					</Card>

					<Card>
						<Title>{global.shipping.title}</Title>
						<div>
							<INTERNAL_Checkbox
								id="standardShipping"
								label={global.shipping.standardShippingLabel}
							/>
							<INTERNAL_Checkbox
								id="fastShipping"
								label={global.shipping.fastShippingLabel}
							/>
						</div>
					</Card>

					<Card>
						<Title>{global.payment.title}</Title>
						<div>
							<INTERNAL_Checkbox id="cod" label={global.payment.codLabel} />
							<INTERNAL_Checkbox
								id="bankTransfer"
								label={global.payment.bankTransferLabel}
							/>
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
						{mockCart.map((item) => {
							return (
								<div
									key={item.id}
									className="grid grid-cols-5 grid-rows-2"
									style={{
										gridTemplateAreas: `"icon title title title remove"
																				"icon reduce count add price"`,
									}}
								>
									<Image
										src="https://placehold.co/200x200"
										alt="Product Image"
										width={200}
										height={200}
										unoptimized={true}
										className="mr-9 h-full w-8 object-contain"
										style={{ gridArea: 'icon' }}
									/>
									<Title style={{ gridArea: 'title' }}>{item.name}</Title>
									<X style={{ gridArea: 'remove' }} />
									<CircleMinus style={{ gridArea: 'reduce' }} />
									<div style={{ gridArea: 'count' }}>{item.amount}</div>
									<CirclePlus style={{ gridArea: 'add' }} />
									<div style={{ gridArea: 'price' }}>{formatPrice(item.price)}</div>
								</div>
							)
						})}
					</div>
				</Card>
			</div>
		</div>
	)
}
