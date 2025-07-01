'use client'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod/v4'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
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
import { CheckoutPageGlobal, Product } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { formatPrice } from '@/utilities/formatPrice'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { CheckoutSchema } from './actions/checkoutSchema'
import CITY_DISTRICT_WARD from './actions/city-district-ward.json'
import { confirmDetailsAction, ConfirmDetailsActionInput } from './actions/confirmDetailsAction'
import { INTERNAL_Card } from './components/Card'
import { INTERNAL_CardTitle as CartTitle } from './components/CardTitle'
import { INTERNAl_CartListWithAccordion } from './components/CartListWithAccordion'
import { INTERNAL_Checkbox as Checkbox } from './components/Checkbox'
import { PaymentQR } from './components/PaymentQR'

enum ProcessingState {
	Idle = 'idle',
	Processing = 'processing',
	Success = 'success',
	Error = 'error',
}

export default function PageClient({
	global,
	override,
	locale,
}: {
	global: CheckoutPageGlobal & {
		bankName?: string | null
		bankAccountNumber?: string | null
	}
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
	locale: Lang
}): React.JSX.Element {
	const { cart, loadedFromLocalStorageDone, loadProduct } = useCartManager({
		syncWithLocalStorage: !override,
	})
	const checkoutSchema = CheckoutSchema(locale)

	const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')
	const prices = calculatePrices({
		code: null,
		shipping:
			shippingMethod === 'express'
				? defaults.shipping.fastShippingPrice
				: defaults.shipping.standardShippingPrice,
		products: cart
			.filter((item) => item.checked)
			.map((item) => ({
				id: item.product.id,
				variant: {
					price: item.variant.price,
					quantity: item.quantity,
				},
				categoryIds: item.product.categoryIds,
				subCategoryIds: item.product.subCategoryIds,
			})),
	})

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

	const form = useForm<z.infer<typeof checkoutSchema>>({
		resolver: standardSchemaResolver(checkoutSchema),
		defaultValues: {
			personalDetails: {
				name: '',
				email: '',
				confirmReceiveEmail: false,
				phoneNumber: '',
			},
			paymentMethod: 'cod',
			sendGift: {
				sender: '',
				receiver: '',
				message: '',
			},
			billingMethod: 'bankTransfer',
			shippingInfo: {
				address: {
					city: '',
					district: '',
					ward: '',
					houseNumber: '',
				},
				method: 'standard',
			},
		},
	})

	const [saveInfoForNextTime, setSaveInfoForNextTime] = useState(false)
	const [processingState, setProcessingState] = useState<ProcessingState>(ProcessingState.Idle)
	const [successDialog, setSuccessDialog] = useState(false)
	const [postDetails, setPostDetails] = useState<{
		invoiceId: string
		paymentMethod: 'cod' | 'bankTransfer'
	}>({
		invoiceId: '',
		paymentMethod: 'cod',
	})

	async function onSubmit(data: z.infer<typeof checkoutSchema>): Promise<void> {
		setProcessingState(ProcessingState.Processing)

		const { city, district, ward } = data.shippingInfo.address
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
			setProcessingState(ProcessingState.Idle)
			return
		}
		const {
			data: result,
			success,
			error,
		} = await confirmDetailsAction({
			cart: cart
				.filter((item) => item.checked)
				.map((item) => ({
					product: item.product.id,
					sku: item.variant.sku,
					quantity: item.quantity,
				})),
			details: data,
		} satisfies ConfirmDetailsActionInput)
		if (!success) {
			toast.error(
				matchLang({
					[Lang.English]: "Can't process your request",
					[Lang.Vietnamese]: 'Không thể xử lý yêu cầu của bạn',
				})(locale),
				{
					description: <span className="whitespace-pre-wrap">{error}</span>,
				},
			)
			setProcessingState(ProcessingState.Idle)
			return
		}

		setPostDetails({
			invoiceId: result.invoiceId,
			paymentMethod: data.paymentMethod,
		})
		setProcessingState(ProcessingState.Success)
		setSuccessDialog(true)
	}

	if (cart.length === 0)
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

	return (
		<Form {...form}>
			<Dialog open={successDialog} onOpenChange={setSuccessDialog}>
				<DialogTrigger />
				<DialogContent className="overflow-hidden rounded-3xl">
					<DialogHeader>
						<DialogTitle className="text-center">
							{global.popup?.successTitle ?? defaults.popup.successTitle(locale)}
						</DialogTitle>
						<DialogDescription className="text-center">
							{global.popup?.successDescription ?? defaults.popup.successDescription(locale)}
							{postDetails.paymentMethod === 'bankTransfer' && (
								<>
									<PaymentQR
										bankName={global.bankName ?? ''}
										bankAccountNumber={global.bankAccountNumber ?? ''}
										amount={prices.total}
										locale={locale}
										invoiceId={postDetails.invoiceId}
									/>
								</>
							)}
						</DialogDescription>
					</DialogHeader>
					<Button className="justify-between" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/" className="w-full">
							{global.popup?.backToHomeButtonLabel ??
								defaults.popup.backToHomeButton(locale)}
							<ArrowRight />
						</a>
					</Button>
				</DialogContent>
			</Dialog>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-[2fr_minmax(24rem,1fr)] gap-x-5 max-[1100px]:grid-cols-1"
			>
				<div className="flex flex-col gap-y-5">
					<INTERNAL_Card>
						<CartTitle>{global.contacts?.title ?? defaults.contacts.title(locale)}</CartTitle>

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
											<Checkbox
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

						<CartTitle>{global.address?.title ?? defaults.address.title(locale)}</CartTitle>

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
								name="shippingInfo.address.city"
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
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="shippingInfo.address.district"
								render={({ field }) => {
									selectedDistrictOnChangeFn.current = field.onChange
									const selectedCity = form.getValues('shippingInfo.address.city')

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
											<FormMessage />
										</FormItem>
									)
								}}
							/>

							<FormField
								control={form.control}
								name="shippingInfo.address.ward"
								render={({ field }) => {
									selectedWardOnChangeFn.current = field.onChange
									const selectedCity = form.getValues('shippingInfo.address.city')
									const selectedDistrict = form.getValues('shippingInfo.address.district')

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
											<FormMessage />
										</FormItem>
									)
								}}
							/>

							<FormField
								control={form.control}
								name="shippingInfo.address.houseNumber"
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

						<Checkbox
							id="saveForNextTime"
							label={
								global.address?.saveForNextTime ?? defaults.address.saveForNextTime(locale)
							}
							classNames={{ container: 'col-span-2' }}
							checked={saveInfoForNextTime}
							onCheckedChange={setSaveInfoForNextTime}
						/>
					</INTERNAL_Card>

					<INTERNAL_Card>
						<CartTitle>{global.shipping?.title ?? defaults.shipping.title(locale)}</CartTitle>
						<FormField
							control={form.control}
							name="shippingInfo.method"
							render={({ field }) => (
								<FormItem>
									<Checkbox
										id="standardShipping"
										label={
											global.shipping?.standardShippingLabel ??
											defaults.shipping.standardShippingLabel(locale)
										}
										checked={field.value === 'standard'}
										onCheckedChange={(value) => {
											setShippingMethod(value ? 'standard' : 'express')
											field.onChange(value ? 'standard' : 'express')
										}}
									/>
									<Checkbox
										id="fastShipping"
										label={
											global.shipping?.fastShippingLabel ??
											defaults.shipping.fastShippingLabel(locale)
										}
										checked={field.value === 'express'}
										onCheckedChange={(value) => {
											setShippingMethod(value ? 'express' : 'standard')
											field.onChange(value ? 'express' : 'standard')
										}}
									/>
								</FormItem>
							)}
						/>
					</INTERNAL_Card>

					<INTERNAL_Card>
						<CartTitle>{global.payment?.title ?? defaults.payment.title(locale)}</CartTitle>
						<FormField
							control={form.control}
							name="paymentMethod"
							render={({ field }) => (
								<FormItem>
									<Checkbox
										id="cod"
										label={global.payment?.codLabel ?? defaults.payment.codLabel(locale)}
										checked={field.value === 'cod'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'cod' : 'bankTransfer')
										}
									/>
									<Checkbox
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
					</INTERNAL_Card>

					<INTERNAL_Card>
						<CartTitle>{global.gift?.title ?? defaults.gift.title(locale)}</CartTitle>
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
					</INTERNAL_Card>
				</div>

				<INTERNAL_Card className="h-fit">
					<CartTitle>{global.order?.title ?? defaults.order.title(locale)}</CartTitle>
					<INTERNAl_CartListWithAccordion locale={locale} />
					<hr />

					<CartTitle>{global.discount?.title ?? defaults.discount.title(locale)}</CartTitle>
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
							<div className="place-self-end">{formatPrice(prices.provisional)}</div>
							<div className="font-bold">
								{global.orderSummary?.shipping ?? defaults.orderSummary.shipping(locale)}
							</div>
							<div className="place-self-end">{formatPrice(prices.shipping)}</div>
							<div className="font-bold">
								{global.orderSummary?.discount ?? defaults.orderSummary.discount(locale)}
							</div>
							<div className="place-self-end">{formatPrice(prices.discount)}</div>
							<div className="font-bold">
								{global.orderSummary?.total ?? defaults.orderSummary.total(locale)}
							</div>
							<div className="place-self-end">{formatPrice(prices.total)}</div>
						</div>
						<ul className="my-6 text-balance italic">
							<li>
								{global.orderSummary?.acknowledgment ??
									defaults.orderSummary.acknowledge(locale)}
							</li>
						</ul>
						<Button
							size="md"
							className={cn(
								'h-14 w-full',
								processingState === ProcessingState.Processing && 'animate-pulse',
							)}
							hideArrow
							disabled={processingState !== ProcessingState.Idle}
						>
							{global.orderSummary?.orderButtonLabel ??
								defaults.orderSummary.orderButton(locale)}
						</Button>
					</div>
				</INTERNAL_Card>
			</form>
		</Form>
	)
}
