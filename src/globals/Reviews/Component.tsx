import { Heart } from 'lucide-react'
import { Phudu } from 'next/font/google'
import { Fragment } from 'react'

import { HeartsRow } from '@/components/HeartsRow'
import { ReviewsGlobalSlug } from '@/globals/Reviews/config'
import { INTERNAL_ReviewDialogContentClient } from '@/globals/Reviews/ReviewDialogContent.client'
import { Order, ReviewsGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['600'],
})

interface Review {
	id: number
	customer: string
	rating: number
	content?: string
	createdAt: Date
}

export async function ReviewsGlobalComponent({
	ordersWithRating,
}: {
	ordersWithRating: Order[] | null
}): Promise<React.JSX.Element> {
	const locale = await getClientLang()
	const global = await getCachedGlobal<ReviewsGlobal>(ReviewsGlobalSlug, 1, locale)()

	const avgRating =
		(ordersWithRating &&
			ordersWithRating.reduce((acc, order) => {
				if (
					order.review &&
					order.review.approved &&
					typeof order.customers === 'object' &&
					order.review.rating
				) {
					acc += order.review.rating
				}
				return acc
			}, 0) / ordersWithRating.length) ??
		5

	const reviews =
		ordersWithRating?.reduce((acc, order) => {
			if (order.review && typeof order.customers === 'object' && order.review.rating) {
				acc.push({
					id: order.id,
					customer:
						order.customers?.name ??
						matchLang({
							[Lang.English]: 'Anonymous',
							[Lang.Vietnamese]: 'Ẩn danh',
						})({ locale }),
					rating: order.review.rating ?? undefined,
					content: order.review.content ?? undefined,
					createdAt: new Date(order.createdAt),
				} satisfies Review)
			}
			return acc
		}, [] as Review[]) ?? []

	const ratingCounts: Record<number, number> = reviews.reduce(
		(acc, review) => {
			if (review.rating) {
				acc[review.rating] = (acc[review.rating] ?? 0) + 1
			}
			return acc
		},
		{} as Record<number, number>,
	)

	if (reviews.length === 0) {
		return (
			<div className="safe-width mt-20 flex h-[26rem] flex-col items-center justify-between py-20 text-center text-2xl font-medium text-primary">
				<div>
					<h1 className="mb-8 text-8xl font-semibold uppercase text-muted-foreground">
						{matchLang({
							[Lang.English]: 'Oh',
							[Lang.Vietnamese]: 'Ồ',
						})({ locale })}
					</h1>
					<div>
						{matchLang({
							[Lang.English]: 'There are no reviews yet',
							[Lang.Vietnamese]: 'Chưa có đánh giá nào cả',
						})({ locale })}
					</div>
				</div>

				<INTERNAL_ReviewDialogContentClient
					global={global}
					className={{ triggerButton: 'self-center' }}
				/>
			</div>
		)
	}

	return (
		<div className="safe-width mt-20 grid grid-cols-[auto_1fr] gap-x-20 text-primary">
			<div>
				<div className="font-serif text-2xl font-medium">{global.title}</div>
				<div className="font-serif text-9xl font-medium">{Math.round(avgRating * 10) / 10}</div>
				<div className="flex w-fit flex-row items-center justify-center gap-4">
					<HeartsRow rating={avgRating} />
					<span className="ml-2 text-xl">{}</span>
				</div>
			</div>

			<div className="flex justify-between">
				<div className="flex flex-col gap-y-3">
					{Array.from({ length: 5 }).map((_, i) => {
						return (
							<div key={i} className="flex items-center">
								<HeartsRow size={16} rating={5 - i} locale={locale} />
								<span className="ml-5 text-2xl">{ratingCounts[5 - i] ?? 0}</span>
							</div>
						)
					})}
				</div>

				<INTERNAL_ReviewDialogContentClient global={global} />
			</div>

			<hr className="col-span-2 mb-10 mt-20 border-border" />

			{reviews.map((review) => {
				return (
					<Fragment key={review.id}>
						<div
							key={`${review.id}-name`}
							className={cn('mb-10 min-h-60 text-[1.75rem] font-semibold', phudu.className)}
						>
							{review.customer}
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
