'use client'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
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
import { useCartManager } from '@/hooks/useCartManager'
import { Lang } from '@/i18n/routing'
import { CheckoutPageGlobal, Product } from '@/payload-types'
import { calculatePrices } from '@/utilities/calculatePrices'
import { formatPrice } from '@/utilities/formatPrice'
import { cn } from '@/utilities/ui'

import { CheckoutSchema } from './actions/checkoutSchema'
import CITY_DISTRICT_WARD from './actions/city-district-ward.json'
import { confirmDetailsAction, ConfirmDetailsActionInput } from './actions/confirmDetailsAction'
import { INTERNAL_Card } from './components/Card'
import { INTERNAL_CardTitle as CartTitle } from './components/CardTitle'
import { INTERNAl_CartListWithAccordion } from './components/CartListWithAccordion'
import { INTERNAL_Checkbox as Checkbox } from './components/Checkbox'
import { PaymentQR } from './components/PaymentQR'

type ProcessingState =
	| {
			state: 'idle'
	  }
	| {
			state: 'processing'
	  }
	| {
			state: 'success'
			invoiceId: string
			paymentMethod: 'cod' | 'bankTransfer'
	  }

const personalDetailsSchemaLocal = z.object({
	email: z.string().optional(),
	confirmReceiveEmail: z.boolean().optional(),
	name: z.string().optional(),
	phoneNumber: z.string().optional(),
	address: z
		.object({
			city: z.string().optional(),
			district: z.string().optional(),
			ward: z.string().optional(),
			houseNumber: z.string().optional(),
		})
		.optional(),
})

export default function PageClient({
	global,
	overrideProduct,
	locale,
}: {
	global: CheckoutPageGlobal & {
		bankName?: string | null
		bankAccountNumber?: string | null
	}
	overrideProduct?: {
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
	const t = useTranslations('globals.checkout')
	const syncWithLocalStorage = !overrideProduct

	const { cart, loadedFromLocalStorageDone, loadProduct } = useCartManager({
		syncWithLocalStorage,
	})
	const checkoutSchema = CheckoutSchema(locale)

	const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')
	const [processingState, setProcessingState] = useState<ProcessingState>({ state: 'idle' })

	const selectedDistrictOnChangeFn = useRef<(value: string) => void>(null)
	const selectedWardOnChangeFn = useRef<(value: string) => void>(null)

	const prices = calculatePrices({
		code: null,
		shipping: shippingMethod === 'express' ? 50000 : 30000,
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

	const [form, onSubmit] = [
		useForm<z.infer<typeof checkoutSchema>>({
			resolver: standardSchemaResolver(checkoutSchema),
			defaultValues: {
				personalDetails: {
					email: '',
					confirmReceiveEmail: false,
					name: '',
					phoneNumber: '',
				},
				shippingInfo: {
					address: {
						city: '',
						district: '',
						ward: '',
						houseNumber: '',
					},
					method: 'standard',
				},
				paymentMethod: 'cod',
				sendGift: {
					sender: '',
					receiver: '',
					message: '',
				},
				discountCode: '',
			},
		}),
		async (data: z.infer<typeof checkoutSchema>): Promise<void> => {
			setProcessingState({ state: 'processing' })

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
				toast.error(t('invalidAddress'))
				setProcessingState({ state: 'idle' })
				return
			}

			const {
				data: result,
				success,
				error,
			} = await confirmDetailsAction(
				{
					cart: cart
						.filter((item) => item.checked)
						.map((item) => ({
							productId: item.product.id,
							productSku: item.variant.sku,
							quantity: item.quantity,
						})),
					details: data,
				} satisfies ConfirmDetailsActionInput,
				locale,
			)

			if (!success) {
				toast.error(t('cantProcess'), {
					description: <span className="whitespace-pre-wrap">{error}</span>,
				})
				setProcessingState({ state: 'idle' })
				return
			}

			setProcessingState({
				state: 'success',
				invoiceId: result.invoiceId,
				paymentMethod: data.paymentMethod,
			})
		},
	]

	const [loadPersonalDetailsOnLoad, setLoadPersonalDetailsOnLoad_] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return localStorage.getItem('save-details') === 'true'
	})
	function setLoadPersonalDetailsOnLoad(value: boolean) {
		setLoadPersonalDetailsOnLoad_(value)
		if (typeof window !== 'undefined')
			localStorage.setItem('save-details', value ? 'true' : 'false')
	}

	useEffect(() => {
		if (overrideProduct)
			loadProduct({
				...overrideProduct,
				quantity: 1,
				checked: true,
			})

		// Load personal details from localStorage if "save-details" is true
		if (typeof window !== 'undefined' && localStorage.getItem('save-details') === 'true') {
			const checkoutDetails = localStorage.getItem('checkout-details')
			if (checkoutDetails)
				try {
					const result = personalDetailsSchemaLocal.safeParse(JSON.parse(checkoutDetails))
					if (result.success) {
						form.setValue('personalDetails.name', result.data.name ?? '')
						form.setValue('personalDetails.email', result.data.email ?? '')
						form.setValue('personalDetails.phoneNumber', result.data.phoneNumber ?? '')
						form.setValue('shippingInfo.address.city', result.data.address?.city ?? '')
						form.setValue(
							'shippingInfo.address.district',
							result.data.address?.district ?? '',
						)
						form.setValue('shippingInfo.address.ward', result.data.address?.ward ?? '')
						form.setValue(
							'shippingInfo.address.houseNumber',
							result.data.address?.houseNumber ?? '',
						)
						form.setValue(
							'personalDetails.confirmReceiveEmail',
							result.data.confirmReceiveEmail ?? false,
						)
					}
				} catch {}
		}

		// Save personal details to localStorage when the form changes
		const subscription = form.watch((value, { name: _ }) => {
			if (value.personalDetails || value.shippingInfo)
				localStorage.setItem(
					'checkout-details',
					JSON.stringify({
						...value.personalDetails,
						address: value.shippingInfo?.address,
					} satisfies z.infer<typeof personalDetailsSchemaLocal>),
				)
		})

		return () => subscription.unsubscribe()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (cart.length === 0)
		return (
			<div className="flex flex-col gap-10">
				<h2>{loadedFromLocalStorageDone ? t('emptyCart') : t('loadingCart')}</h2>
				{loadedFromLocalStorageDone && (
					<Button className="w-fit justify-between" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/">
							{t('goHome')}
							<ArrowRight />
						</a>
					</Button>
				)}
			</div>
		)

	return (
		<Form {...form}>
			<Dialog open={processingState.state === 'success'} onOpenChange={() => {}}>
				<DialogTrigger />
				<DialogContent className="overflow-hidden rounded-3xl [&>button]:hidden">
					<DialogHeader>
						<DialogTitle className="text-center">
							{global.popup?.successTitle ?? t('popup.successTitle')}
						</DialogTitle>
						<DialogDescription className="text-center">
							{global.popup?.successDescription ?? t('popup.successDescription')}
							{processingState.state === 'success' &&
								processingState.paymentMethod === 'bankTransfer' &&
								global.bankName &&
								global.bankAccountNumber && (
									<>
										<PaymentQR
											bankName={global.bankName}
											bankAccountNumber={global.bankAccountNumber}
											amount={prices.total}
											invoiceId={processingState.invoiceId}
										/>
									</>
								)}
						</DialogDescription>
					</DialogHeader>
					<Button className="justify-between" asChild>
						{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
						<a href="/" className="w-full">
							{global.popup?.backToHomeButtonLabel ?? t('popup.backToHomeButton')}
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
					{/* personal info */}
					<INTERNAL_Card>
						<CartTitle>{global.contacts?.title ?? t('contacts.title')}</CartTitle>

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
													t('contacts.emailInputLabel')
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
													t('contacts.acceptNewsletter')
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

						<CartTitle>{global.address?.title ?? t('address.title')}</CartTitle>

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
													t('address.nameInputLabel')
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
													t('address.phoneInputLabel')
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
													t('address.provinceCityInputLabel')
												}
												aria-label={
													global.address?.provinceCityInputLabel ??
													t('address.provinceCityInputLabel')
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
														t('address.districtInputLabel')
													}
													aria-label={
														global.address?.districtInputLabel ??
														t('address.districtInputLabel')
													}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{Object.keys(
														selectedCity
															? // @ts-expect-error - idc
																(CITY_DISTRICT_WARD[selectedCity] ??
																	{})
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
									const selectedDistrict = form.getValues(
										'shippingInfo.address.district',
									)

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
														t('address.wardInputLabel')
													}
													aria-label={
														global.address?.wardInputLabel ??
														t('address.wardInputLabel')
													}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{(selectedCity && selectedDistrict
														? // @ts-expect-error - idc
															CITY_DISTRICT_WARD[selectedCity][
																selectedDistrict
															]
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
													global.address?.details ?? t('address.details')
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
							label={global.address?.saveForNextTime ?? t('address.saveForNextTime')}
							classNames={{ container: 'col-span-2' }}
							checked={loadPersonalDetailsOnLoad}
							onCheckedChange={setLoadPersonalDetailsOnLoad}
						/>
					</INTERNAL_Card>

					{/* shipping method */}
					<INTERNAL_Card>
						<CartTitle>{global.shipping?.title ?? t('shipping.title')}</CartTitle>
						<FormField
							control={form.control}
							name="shippingInfo.method"
							render={({ field }) => (
								<FormItem>
									<Checkbox
										id="standardShipping"
										label={
											global.shipping?.standardShippingLabel ??
											t('shipping.standardShippingLabel')
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
											t('shipping.fastShippingLabel')
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

					{/* payment method */}
					<INTERNAL_Card>
						<CartTitle>{global.payment?.title ?? t('payment.title')}</CartTitle>
						<FormField
							control={form.control}
							name="paymentMethod"
							render={({ field }) => (
								<FormItem>
									<Checkbox
										id="cod"
										label={global.payment?.codLabel ?? t('payment.codLabel')}
										checked={field.value === 'cod'}
										onCheckedChange={(value) =>
											field.onChange(value ? 'cod' : 'bankTransfer')
										}
									/>
									<Checkbox
										id="bankTransfer"
										label={
											global.payment?.bankTransferLabel ??
											t('payment.bankTransferLabel')
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

					{/* send as gift */}
					<INTERNAL_Card>
						<CartTitle>{global.gift?.title ?? t('gift.title')}</CartTitle>
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
													global.gift?.senderInputLabel ??
													t('gift.sender')
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
													t('gift.recipient')
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
													t('gift.message')
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
					<CartTitle>{global.order?.title ?? t('order.title')}</CartTitle>
					<INTERNAl_CartListWithAccordion syncWithLocalStorage={syncWithLocalStorage} />
					<hr />

					<CartTitle>{global.discount?.title ?? t('discount.title')}</CartTitle>
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
												t('discount.inputLabel')
											}
											aria-label={
												global.discount?.inputPlaceholder ??
												t('discount.inputLabel')
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
								global.discount?.applyButtonLabel ?? t('discount.applyButton')
							}
							className="h-[calc(4.5rem-1.25rem)]"
							size="md"
							onClick={(e) => {
								e.preventDefault()
							}}
						>
							{global.discount?.applyButtonLabel ?? t('discount.applyButton')}
						</Button>
					</div>
					<hr className="my-2" />

					<div>
						<div className="grid grid-cols-[auto_1fr] gap-2">
							<div className="font-bold">
								{global.orderSummary?.provisional ?? t('orderSummary.provisional')}
							</div>
							<div className="place-self-end">{formatPrice(prices.provisional)}</div>
							<div className="font-bold">
								{global.orderSummary?.shipping ?? t('orderSummary.shipping')}
							</div>
							<div className="place-self-end">{formatPrice(prices.shipping)}</div>
							<div className="font-bold">
								{global.orderSummary?.discount ?? t('orderSummary.discount')}
							</div>
							<div className="place-self-end">{formatPrice(prices.discount)}</div>
							<div className="font-bold">
								{global.orderSummary?.total ?? t('orderSummary.total')}
							</div>
							<div className="place-self-end">{formatPrice(prices.total)}</div>
						</div>
						<ul className="my-6 text-balance italic">
							<li>
								{global.orderSummary?.acknowledgment ??
									t('orderSummary.acknowledge')}
							</li>
						</ul>
						<Button
							size="md"
							className={cn(
								'h-14 w-full',
								processingState.state === 'processing' && 'animate-pulse',
							)}
							hideArrow
							disabled={processingState.state !== 'idle'}
						>
							{global.orderSummary?.orderButtonLabel ?? t('orderSummary.orderButton')}
						</Button>
					</div>
				</INTERNAL_Card>
			</form>
		</Form>
	)
}
