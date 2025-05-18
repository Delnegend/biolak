'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { TextInput } from '@/components/ui/text-input'
import { ReviewsGlobal } from '@/payload-types'

import { sendReviewAction, SendReviewInputType } from './actions/sendReviewAction'

export function ReviewDialogContentClient({
	global,
}: {
	global: ReviewsGlobal
}): React.JSX.Element {
	const { register, handleSubmit } = useForm<SendReviewInputType>()
	const onSubmit: SubmitHandler<SendReviewInputType> = async (data) => {
		const response = await sendReviewAction(data)
		if (response.success) {
			toast.success('Đánh giá đã được gửi thành công')
			return
		}
		toast.error('Không thể gửi đánh giá', {
			description: response.error,
		})
	}

	return (
		<DialogContent className="w-full max-w-3xl">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 p-20">
				<h2>{global.reviewDialogTitle}</h2>
				<TextInput label="Mã đơn hàng" {...register('invoiceId')}></TextInput>
				<TextInput label="Nội dung" {...register('content')}></TextInput>
				<Button type="submit" className="w-full" hideArrow={true}>
					{global.sendReviewBtnLabel}
				</Button>
			</form>
		</DialogContent>
	)
}
