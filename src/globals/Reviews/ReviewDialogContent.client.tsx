'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
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

export function INTERNAL_ReviewDialogContentClient({
	global,
}: {
	global: ReviewsGlobal
}): React.JSX.Element {
	const { lang: locale } = useClientLang()
	const [dialogOpen, setDialogOpen] = useState(false)
	const { register, handleSubmit } = useForm<SendReviewInputType>()
	const [rating, setRating] = useState<number>(5)

	const onSubmit: SubmitHandler<SendReviewInputType> = async (data) => {
		const response = await sendReviewAction({ ...data, rating })
		setRating(5)
		setDialogOpen(false)
		if (response.success) {
			toast.success(
				matchLang({
					[Lang.English]: 'Review has been sent successfully',
					[Lang.Vietnamese]: 'Đánh giá đã được gửi thành công',
				})({ locale }),
			)
			return
		}
		toast.error(
			matchLang({
				[Lang.English]: 'Unable to send review',
				[Lang.Vietnamese]: 'Không thể gửi đánh giá',
			})({ locale }),
			{
				description: response.error,
			},
		)
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button className="w-full max-w-[25.5rem] self-end" hideArrow={true}>
					{global.btnLabel}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-3xl">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 p-20">
					<DialogTitle>{global.reviewDialogTitle}</DialogTitle>

					<div className="flex flex-row justify-center gap-x-[0.875rem]">
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
									})({ locale })}
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

					<TextInput label="Mã đơn hàng" {...register('invoiceId')}></TextInput>
					<TextInput label="Nội dung" {...register('content')}></TextInput>
					<Button type="submit" className="w-full" hideArrow={true}>
						{global.sendReviewBtnLabel}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
