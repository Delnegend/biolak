'use client'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { ArrowRight, ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod/v4'

import { CartListClient } from '@/components/CartList.client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TextInput } from '@/components/ui/text-input'
import { CheckoutPageGlobalDefaults as defaults } from '@/globals/CheckoutPage/defaults'
import { useCartManager } from '@/hooks/useCartManager'
import { useClientLang } from '@/hooks/useClientLang'
import { CheckoutPageGlobal, Product } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import CITY_DISTRICT_WARD from './actions/city-district-ward.json'
import { confirmDetailsAction, ConfirmDetailsActionSchema } from './actions/confirmDetailsAction'

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

function Card({
	className,
	children,
	...props
}: React.ComponentPropsWithRef<'div'> & {
	className?: string
	children: React.ReactNode
}): React.JSX.Element {
	return (
		<div
			className={cn('flex flex-col gap-y-4 rounded-xl bg-white p-6 text-primary', className)}
			{...props}
		>
			{children}
		</div>
	)
}

function CustomizedCheckbox({
	classNames,
	label,
	id,
	checked,
	onCheckedChange,
}: {
	classNames?: {
		container?: string
		checkbox?: string
		label?: string
	}
	label: string
	id: string
	checked: boolean
	onCheckedChange?: (value: boolean) => void
}): React.JSX.Element {
	return (
		<div className={cn('mt-4 flex items-center gap-x-3', classNames?.container)}>
			<Checkbox
				id={id}
				className={classNames?.checkbox}
				checked={checked}
				onCheckedChange={onCheckedChange}
			/>
			<label htmlFor={id} className={cn('text-xl text-muted-foreground', classNames?.label)}>
				{label}
			</label>
		</div>
	)
}

function CartListWithAccordion(): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const [open, setOpen] = useState(true)

	return (
		<div>
			<div
				className={cn('grid transition-all', {
					'grid-rows-[1fr]': open,
					'grid-rows-[0fr]': !open,
				})}
			>
				<CartListClient
					showCheckbox={false}
					className="mb-4 min-h-0 overflow-hidden"
					locale={locale}
				/>
			</div>

			<button
				className="!flex w-full flex-row items-center justify-between font-sans text-xl"
				aria-label={matchLang({
					[Lang.English]: 'Toggle cart details',
					[Lang.Vietnamese]: 'Ẩn hiện chi tiết giỏ hàng',
				})(locale)}
				onClick={(e) => {
					e.preventDefault()
					setOpen((prev) => !prev)
				}}
			>
				{matchLang({
					[Lang.English]: open ? 'Hide details' : 'Cart details',
					[Lang.Vietnamese]: open ? 'Ẩn chi tiết' : 'Chi tiết giỏ hàng',
				})(locale)}
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

export default function PageClient({
	global,
	override,
}: {
	global: CheckoutPageGlobal
	override?: {
		product: {
			id: Product['id']
			title: Product['title']
			slug: Product['slug']
		}
		variant: {
			sku: Product['variants'][number]['sku']
			title: Product['variants'][number]['title']
			price: Product['variants'][number]['price']
			image?: Product['variants'][number]['image'] | null
		}
	} | null
}): React.JSX.Element {
	const { cart, loadedFromLocalStorageDone, loadProduct } = useCartManager({
		syncWithLocalStorage: !override,
	})
	const provisional = cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0)
	const { lang: locale } = useClientLang()
	const Schema = ConfirmDetailsActionSchema(locale)

	useEffect(() => {
		if (override)
			loadProduct({
				...override,
				quantity: 1,
				checked: true,
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const selectedDistrictOnChangeFn = useRef<(value: string) => void>(null)
	const selectedWardOnChangeFn = useRef<(value: string) => void>(null)

	const form = useForm<z.infer<typeof Schema>>({
		resolver: standardSchemaResolver(Schema),
		defaultValues: {
			personalDetails: {
				name: '',
				email: '',
				confirmReceiveEmail: false,
				phoneNumber: '',
				city: '',
				district: '',
				ward: '',
				houseNumber: '',
			},
			transportationMethod: 'standard',
			paymentMethod: 'cod',
			sendGift: {
				sender: '',
				receiver: '',
				message: '',
			},
		},
	})

	const [saveInfoForNextTime, setSaveInfoForNextTime] = useState(false)

	async function onSubmit(data: z.infer<typeof Schema>): Promise<void> {
		const { city, district, ward } = data.personalDetails
		const cityDistrictWard: Record<
			string,
			Record<string, string[]>
		> = CITY_DISTRICT_WARD as Record<string, Record<string, string[]>>
		if (
			!cityDistrictWard[city] ||
			!cityDistrictWard[city][district] ||
			!cityDistrictWard[city][district].includes(ward)
		) {
			toast.error(
				matchLang({
					[Lang.English]: 'Invalid district or ward for the selected city',
					[Lang.Vietnamese]: 'Quận hoặc phường không hợp lệ cho thành phố đã chọn',
				})(locale),
			)
			return
		}
		const result = await confirmDetailsAction(data)
		if (!result.success) {
			toast.error(
				matchLang({
					[Lang.English]: "Can't process your request",
					[Lang.Vietnamese]: 'Không thể xử lý yêu cầu của bạn',
				})(locale),
				{
					description: <span className="whitespace-pre-wrap">{result.error}</span>,
				},
			)
			return
		}
		toast.success(
			matchLang({
				[Lang.English]: 'Details confirmed successfully',
				[Lang.Vietnamese]: 'Xác nhận thông tin thành công',
			})(locale),
		)
	}

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
					})(locale)}
				</h2>
				{loadedFromLocalStorageDone && (
					<Button className="w-fit justify-between" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/">
							{matchLang({
								[Lang.English]: 'Go to home page',
								[Lang.Vietnamese]: 'Về trang chủ',
							})(locale)}
							<ArrowRight />
						</a>
					</Button>
				)}
			</div>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-[2fr_minmax(24rem,1fr)] gap-x-5 max-[1100px]:grid-cols-1"
			>
				<div className="flex flex-col gap-y-5">
					<Card>
						<Title>{global.contacts?.title ?? defaults.contacts.title(locale)}</Title>

						<div>
							<FormField
								control={form.control}
								name="personalDetails.email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												label={
													global.contacts?.emailInputLabel ??
													defaults.contacts.emailInputLabel(locale)
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="personalDetails.confirmReceiveEmail"
								render={({ field }) => {
									return (
										<FormItem>
											<CustomizedCheckbox
												id="newsletter"
												label={
													global.contacts?.acceptNewsletter ??
													defaults.contacts.acceptNewsletter(locale)
												}
												{...field}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormItem>
									)
								}}
							/>
						</div>

						<Title>{global.address?.title ?? defaults.address.title(locale)}</Title>

						<div className="grid grid-cols-2 gap-x-6 gap-y-9">
							<FormField
								control={form.control}
								name="personalDetails.name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												label={
													global.address?.nameInputLabel ??
													defaults.address.nameInputLabel(locale)
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="personalDetails.phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												label={
													global.address?.phoneInputLabel ??
													defaults.address.phoneInputLabel(locale)
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="personalDetails.city"
								render={({ field }) => (
									<FormItem>
										<Select
											value={field.value}
											onValueChange={(val) => {
												field.onChange(val)
												selectedDistrictOnChangeFn.current?.('')
												selectedWardOnChangeFn.current?.('')
											}}
										>
											<SelectTrigger
												label={
													global.address?.provinceCityInputLabel ??
													defaults.address.provinceCityInputLabel(locale)
												}
												aria-label={
													global.address?.provinceCityInputLabel ??
													defaults.address.provinceCityInputLabel(locale)
												}
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
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="personalDetails.district"
								render={({ field }) => {
									selectedDistrictOnChangeFn.current = field.onChange
									const selectedCity = form.getValues('personalDetails.city')

									return (
										<FormItem>
											<Select
												value={field.value}
												onValueChange={(val) => {
													field.onChange(val)
													selectedWardOnChangeFn.current?.('')
												}}
												disabled={!selectedCity}
											>
												<SelectTrigger
													label={
														global.address?.districtInputLabel ??
														defaults.address.districtInputLabel(locale)
													}
													aria-label={
														global.address?.districtInputLabel ??
														defaults.address.districtInputLabel(locale)
													}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{Object.keys(
														selectedCity && selectedCity in CITY_DISTRICT_WARD
															? CITY_DISTRICT_WARD[
																	selectedCity as keyof typeof CITY_DISTRICT_WARD
																]
															: {},
													).map((district) => (
														<SelectItem key={district} value={district}>
															{district}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)
								}}
							/>

							<FormField
								control={form.control}
								name="personalDetails.ward"
								render={({ field }) => {
									selectedWardOnChangeFn.current = field.onChange
									const selectedCity = form.getValues('personalDetails.city')
									const selectedDistrict = form.getValues('personalDetails.district')

									return (
										<FormItem>
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={!selectedDistrict || !selectedCity}
											>
												<SelectTrigger
													label={
														global.address?.wardInputLabel ??
														defaults.address.wardInputLabel(locale)
													}
													aria-label={
														global.address?.wardInputLabel ??
														defaults.address.wardInputLabel(locale)
													}
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
										</FormItem>
									)
								}}
							/>

							<FormField
								control={form.control}
								name="personalDetails.houseNumber"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												label={
													global.address?.details ?? defaults.address.details(locale)
												}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<CustomizedCheckbox
							id="saveForNextTime"
							label={
								global.address?.saveForNextTime ?? defaults.address.saveForNextTime(locale)
							}
							classNames={{ container: 'col-span-2' }}
							checked={saveInfoForNextTime}
							onCheckedChange={setSaveInfoForNextTime}
						/>
					</Card>

					<Card>
						<Title>{global.shipping?.title ?? defaults.shipping.title(locale)}</Title>
						<FormField
							control={form.control}
							name="transportationMethod"
							render={({ field }) => (
								<FormItem>
									<CustomizedCheckbox
										id="standardShipping"
										label={
											global.shipping?.standardShippingLabel ??
											defaults.shipping.standardShippingLabel(locale)
										}
										checked={field.value === 'standard'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'standard' : 'express')
										}
									/>
									<CustomizedCheckbox
										id="fastShipping"
										label={
											global.shipping?.fastShippingLabel ??
											defaults.shipping.fastShippingLabel(locale)
										}
										checked={field.value === 'express'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'express' : 'standard')
										}
									/>
								</FormItem>
							)}
						/>
					</Card>

					<Card>
						<Title>{global.payment?.title ?? defaults.payment.title(locale)}</Title>
						<FormField
							control={form.control}
							name="paymentMethod"
							render={({ field }) => (
								<FormItem>
									<CustomizedCheckbox
										id="cod"
										label={global.payment?.codLabel ?? defaults.payment.codLabel(locale)}
										checked={field.value === 'cod'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'cod' : 'bankTransfer')
										}
									/>
									<CustomizedCheckbox
										id="bankTransfer"
										label={
											global.payment?.bankTransferLabel ??
											defaults.payment.bankTransferLabel(locale)
										}
										checked={field.value === 'bankTransfer'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'bankTransfer' : 'cod')
										}
									/>
								</FormItem>
							)}
						/>
					</Card>

					<Card>
						<Title>{global.gift?.title ?? defaults.gift.title(locale)}</Title>
						<div className="grid grid-cols-2 gap-x-6 gap-y-3">
							<FormField
								control={form.control}
								name="sendGift.sender"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												label={
													global.gift?.senderInputLabel ?? defaults.gift.sender(locale)
												}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="sendGift.receiver"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												label={
													global.gift?.recipientInputLabel ??
													defaults.gift.recipient(locale)
												}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="sendGift.message"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextInput
												size="sm"
												classNames={{
													container: 'col-span-2',
												}}
												label={
													global.gift?.messageInputLabel ??
													defaults.gift.message(locale)
												}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</Card>
				</div>

				<Card className="h-fit">
					<Title>{global.order?.title ?? defaults.order.title(locale)}</Title>
					<CartListWithAccordion />
					<hr />

					<Title>{global.discount?.title ?? defaults.discount.title(locale)}</Title>
					<div className="flex h-[4.5rem] items-center justify-between rounded-[0.5rem] border border-primary p-[0.625rem]">
						<FormField
							control={form.control}
							name="discountCode"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<input
											type="text"
											placeholder={
												global.discount?.inputPlaceholder ??
												defaults.discount.inputLabel(locale)
											}
											aria-label={
												global.discount?.inputPlaceholder ??
												defaults.discount.inputLabel(locale)
											}
											className="h-[calc(4.5rem-1.25rem)] w-full border-primary bg-transparent px-3 text-lg placeholder:text-muted-foreground focus:outline-none"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							hideArrow
							aria-label={
								global.discount?.applyButtonLabel ?? defaults.discount.applyButton(locale)
							}
							className="h-[calc(4.5rem-1.25rem)]"
							size="md"
							onClick={(e) => {
								e.preventDefault()
							}}
						>
							{global.discount?.applyButtonLabel ?? defaults.discount.applyButton(locale)}
						</Button>
					</div>
					<hr className="my-2" />

					<div>
						<div className="grid grid-cols-[auto_1fr] gap-2">
							<div className="font-bold">
								{global.orderSummary?.provisional ??
									defaults.orderSummary.provisional(locale)}
							</div>
							<div className="place-self-end">{formatPrice(provisional)}</div>
							<div className="font-bold">
								{global.orderSummary?.shipping ?? defaults.orderSummary.shipping(locale)}
							</div>
							<div className="place-self-end">{formatPrice(0)}</div>
							<div className="font-bold">
								{global.orderSummary?.discount ?? defaults.orderSummary.discount(locale)}
							</div>
							<div className="place-self-end">{formatPrice(0)}</div>
							<div className="font-bold">
								{global.orderSummary?.total ?? defaults.orderSummary.total(locale)}
							</div>
							<div className="place-self-end">{formatPrice(provisional)}</div>
						</div>
						<ul className="my-6 text-balance italic">
							<li>
								{global.orderSummary?.acknowledgment ??
									defaults.orderSummary.acknowledge(locale)}
							</li>
						</ul>
						<Button size="md" className="h-14 w-full" hideArrow>
							{global.orderSummary?.orderButtonLabel ??
								defaults.orderSummary.orderButton(locale)}
						</Button>
					</div>
				</Card>
			</form>
		</Form>
	)
}
