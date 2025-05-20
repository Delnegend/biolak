import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Heart } from 'lucide-react'
import { Phudu } from 'next/font/google'
import { Fragment } from 'react'

import { Button } from '@/components/ui/button'
import { ReviewsGlobalSlug } from '@/globals/Reviews/config'
import { INTERNAL_ReviewDialogContentClient } from '@/globals/Reviews/ReviewDialogContent.client'
import { ReviewsGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['600'],
})

const mockReviews = Array.from({ length: 10 }).map((_, i) => ({
	id: i,
	title: 'Trang Linh',
	content: 'Nếu bạn muốn đánh giá từ khách hàng, hãy nhấn vào nút đánh giá từ khách hàng.',
	rating: Math.floor(Math.random() * 5) + 1,
	createdAt: new Date(),
}))

export async function ReviewsGlobalComponent(): Promise<React.JSX.Element> {
	const reviewGlobal = (await getCachedGlobal(ReviewsGlobalSlug, 1)()) as ReviewsGlobal

	return (
		<div className="safe-width mt-20 grid grid-cols-[auto_1fr] gap-x-20 text-primary">
			<div>
				<div className="font-serif text-2xl font-medium">{reviewGlobal.title}</div>
				<div className="font-serif text-9xl font-medium">5.0</div>
				<div className="flex w-fit flex-row items-center justify-center gap-4">
					<Heart />
					<Heart />
					<Heart />
					<Heart />
					<Heart />
					<span className="ml-2 text-xl">(10)</span>
				</div>
			</div>

			<div className="flex justify-between">
				<div className="grid grid-cols-6 gap-x-[0.875rem] gap-y-3">
					{Array.from({ length: 30 }).map((_, i) => {
						const fill = [0, 1, 2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 18, 19, 24].includes(i)
						if (i % 6 === 5) {
							return <div key={i}>(1)</div>
						}
						return (
							<Heart
								key={i}
								fill={fill ? '#925E12' : 'transparent'}
								className={cn(fill && 'text-[#925E12]')}
							/>
						)
					})}
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-full max-w-[25.5rem] self-end" hideArrow={true}>
							{reviewGlobal.btnLabel}
						</Button>
					</DialogTrigger>
					<INTERNAL_ReviewDialogContentClient global={reviewGlobal} />
				</Dialog>
			</div>

			<hr className="col-span-2 mb-10 mt-20 border-border" />

			{mockReviews.map((review) => {
				return (
					<Fragment key={review.id}>
						<div
							key={`${review.id}-name`}
							className={cn('mb-10 min-h-60 text-[1.75rem] font-semibold', phudu.className)}
						>
							{review.title}
						</div>

						<div key={`${review.id}-content`} className="mb-10">
							<div className="mb-1 flex justify-between">
								<div className="flex flex-row gap-x-[0.875rem]">
									{Array.from({ length: 5 }).map((_, i) => {
										return (
											<Heart
												key={i}
												fill={review.rating >= i + 1 ? '#925E12' : 'transparent'}
												className={cn(review.rating >= i + 1 && 'text-[#925E12]')}
											/>
										)
									})}
								</div>
								<div className="font-serif text-2xl font-medium">
									{review.createdAt.toLocaleDateString('vi-VN', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									})}
								</div>
							</div>
							<div className="font-serif text-2xl font-bold">{review.content}</div>
						</div>
					</Fragment>
				)
			})}
		</div>
	)
}
