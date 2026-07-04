'use client'

import { CirclePlus, Heart, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TextInput } from '@/components/ui/text-input'
import { ReviewsGlobal } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { sendReviewAction, SendReviewInputType } from './actions/sendReviewAction'

export function INTERNAL_ReviewDialogContentClient({
	global,
	className,
}: {
	global: ReviewsGlobal
	className?: {
		triggerButton?: string
	}
}): React.JSX.Element {
	const t = useTranslations('globals.reviews')
	const [dialogOpen, setDialogOpen] = useState(false)
	const { register, handleSubmit } = useForm<SendReviewInputType>()
	const [rating, setRating] = useState<number>(5)
	const [reviewImages, setReviewImages] = useState<File[]>([])

	const onSubmit: SubmitHandler<SendReviewInputType> = async (data) => {
		const response = await sendReviewAction({ ...data, rating })
		setRating(5)
		setDialogOpen(false)
		if (response.success) {
			toast.success(t('toastSuccess'))
			return
		}
		toast.error(t('toastError'), {
			description: response.error,
		})
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
						{global.btnLabel ?? t('reviewButtonLabel')}
					</Button>
				</DialogTrigger>
				<DialogContent
					className="w-full max-w-[60rem] overflow-hidden"
					aria-label={t('dialogAriaLabel')}
				>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-9 overflow-x-auto"
					>
						<DialogTitle>
							{global.reviewDialogTitle ?? t('reviewDialogTitle')}
						</DialogTitle>

						<div>
							<div className="mb-6 text-xl text-muted-foreground">
								{global.heartsSelectionLabel ?? t('heartsSelectionLabel')}
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
											aria-label={t('heartButtonLabel', { n: i + 1 })}
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
							label={global.invoiceIdLabel ?? t('invoiceIdLabel')}
							{...register('invoiceId')}
						></TextInput>
						<TextInput
							size="sm"
							label={global.contentLabel ?? t('contentLabel')}
							{...register('content')}
						></TextInput>

						<div className="flex flex-row gap-6 overflow-auto">
							<AnimatePresence initial={false}>
								{reviewImages?.map((image, index) => (
									<motion.div
										key={image.name + image.lastModified + index}
										className="relative flex aspect-square size-[12.5rem] items-center justify-center overflow-clip rounded-xl border-2"
										initial={{ opacity: 0, x: -24 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -24 }}
										transition={{ duration: 0.25 }}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={URL.createObjectURL(image)}
											alt={t('reviewImageAlt', { n: index + 1 })}
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
													Array.from(reviewImageUpload.files).forEach(
														(file, idx) => {
															if (idx !== index)
																dataTransfer.items.add(file)
														},
													)
												}

												reviewImageUpload.files = dataTransfer.files
											}}
										>
											<X
												className="absolute right-2 top-2 rounded-full bg-black/50 p-1"
												color="white"
											/>
										</button>
									</motion.div>
								))}
							</AnimatePresence>
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
								aria-label={t('addImageLabel')}
								htmlFor="ghost-input"
							>
								<CirclePlus size={40} />
							</label>
						</div>

						<Button type="submit" className="w-full">
							{global.sendReviewBtnLabel ?? t('sendReviewButtonLabel')}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
