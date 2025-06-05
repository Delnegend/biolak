'use client'

import { CirclePlus, Heart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TextInput } from '@/components/ui/text-input'
import { useClientLang } from '@/hooks/useClientLang'
import { ReviewsGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { sendReviewAction, SendReviewInputType } from './actions/sendReviewAction'
import { ReviewsGlobalDefaults as defaults } from './defaults'

export function INTERNAL_ReviewDialogContentClient({
	global,
	className,
}: {
	global: ReviewsGlobal
	className?: {
		triggerButton?: string
	}
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const [dialogOpen, setDialogOpen] = useState(false)
	const { register, handleSubmit } = useForm<SendReviewInputType>()
	const [rating, setRating] = useState<number>(5)
	const [reviewImages, setReviewImages] = useState<File[]>([])

	const onSubmit: SubmitHandler<SendReviewInputType> = async (data) => {
		const response = await sendReviewAction({ ...data, rating })
		setRating(5)
		setDialogOpen(false)
		if (response.success) {
			toast.success(
				matchLang({
					[Lang.English]: 'Review has been sent successfully',
					[Lang.Vietnamese]: 'Đánh giá đã được gửi thành công',
				})(locale),
			)
			return
		}
		toast.error(
			matchLang({
				[Lang.English]: 'Unable to send review',
				[Lang.Vietnamese]: 'Không thể gửi đánh giá',
			})(locale),
			{
				description: response.error,
			},
		)
	}

	useEffect(() => {
		const controller = new AbortController()

		const ghostInput = document.getElementById('ghost-input') as HTMLInputElement
		if (!ghostInput) return

		ghostInput.addEventListener(
			'change',
			(e) => {
				const inputReviewImages = document.getElementById(
					'review-image-upload',
				) as HTMLInputElement

				const target = e.target as HTMLInputElement
				if (!target.files) return

				const filesArray = Array.from(target.files)
				setReviewImages((prev) => [...prev, ...filesArray])

				const dataTransfer = new DataTransfer()
				if (inputReviewImages.files) {
					Array.from(inputReviewImages.files).forEach((file) => {
						dataTransfer.items.add(file)
					})
				}
				filesArray.forEach((file) => {
					dataTransfer.items.add(file)
				})

				inputReviewImages.files = dataTransfer.files
				target.value = ''
			},
			{ signal: controller.signal },
		)

		return () => {
			controller.abort()
		}
	}, [])

	return (
		<>
			<input
				type="file"
				accept="image/*"
				className="hidden"
				id="ghost-input"
				multiple
				tabIndex={-1}
			/>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild>
					<Button
						className={cn('w-full max-w-[25.5rem] self-end', className?.triggerButton)}
						hideArrow={true}
					>
						{global.btnLabel ?? defaults.reviewButtonLabel(locale)}
					</Button>
				</DialogTrigger>
				<DialogContent
					className="w-full max-w-[60rem] overflow-hidden p-20"
					aria-label={matchLang({
						[Lang.English]: 'Send a review for your order dialog',
						[Lang.Vietnamese]: 'Hộp thoại gửi đánh giá cho đơn hàng của bạn',
					})(locale)}
				>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
						<DialogTitle>
							{global.reviewDialogTitle ?? defaults.reviewDialogTitle(locale)}
						</DialogTitle>

						<div>
							<div className="mb-6 text-xl text-muted-foreground">
								{global.heartsSelectionLabel ?? defaults.heartsSelectionLabel(locale)}
							</div>
							<div className="flex flex-row gap-x-[0.875rem]">
								{Array.from({ length: 5 }).map((_, i) => {
									return (
										<button
											key={i}
											onClick={(e) => {
												e.preventDefault()
												setRating(i + 1)
											}}
											className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
											aria-label={matchLang({
												[Lang.English]: `Set rating to ${i + 1} over 5`,
												[Lang.Vietnamese]: `Đặt đánh giá tới ${i + 1} trên 5`,
											})(locale)}
										>
											<Heart
												fill={rating >= i + 1 ? '#925E12' : 'transparent'}
												className={cn(rating >= i + 1 && 'text-[#925E12]')}
												size={36}
											/>
										</button>
									)
								})}
							</div>
						</div>

						<TextInput
							size="sm"
							label={global.invoiceIdLabel ?? defaults.invoiceIdLabel(locale)}
							{...register('invoiceId')}
						></TextInput>
						<TextInput
							size="sm"
							label={global.contentLabel ?? defaults.contentLabel(locale)}
							{...register('content')}
						></TextInput>

						<div className="flex flex-row gap-6 overflow-auto">
							{reviewImages?.map((image, index) => (
								<div
									key={index}
									className="relative flex aspect-square size-[12.5rem] items-center justify-center overflow-clip rounded-xl border-2"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={URL.createObjectURL(image)}
										alt={matchLang({
											[Lang.English]: `Review image ${index + 1}`,
											[Lang.Vietnamese]: `Hình ảnh đánh giá ${index + 1}`,
										})(locale)}
										className="size-full overflow-hidden object-cover"
									/>
									<button
										onClick={(e) => {
											e.preventDefault()
											setReviewImages((prev) => {
												const newImages = [...prev]
												newImages.splice(index, 1)
												return newImages
											})
											const reviewImageUpload = document.getElementById(
												'review-image-upload',
											) as HTMLInputElement
											if (!reviewImageUpload) return

											const dataTransfer = new DataTransfer()
											if (reviewImageUpload.files) {
												Array.from(reviewImageUpload.files).forEach((file, idx) => {
													if (idx !== index) dataTransfer.items.add(file)
												})
											}

											reviewImageUpload.files = dataTransfer.files
										}}
									>
										<X className="absolute right-2 top-2" color="white" />
									</button>
								</div>
							))}
							<input
								type="file"
								accept="image/*"
								multiple
								className="hidden"
								id="review-image-upload"
								{...register('images')}
							/>
							<label
								className="flex size-[12.5rem] min-w-[12.5rem] cursor-pointer items-center justify-center overflow-clip rounded-xl border-2"
								aria-label={matchLang({
									[Lang.English]: 'Add a review image',
									[Lang.Vietnamese]: 'Thêm hình ảnh đánh giá',
								})(locale)}
								htmlFor="ghost-input"
							>
								<CirclePlus size={40} />
							</label>
						</div>

						<Button type="submit" className="w-full">
							{global.sendReviewBtnLabel ?? defaults.sendReviewButtonLabel(locale)}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
