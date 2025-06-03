import { Heart } from 'lucide-react'

import { defaultLocale, Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

export function HeartsRow({
	rating,
	onClick,
	locale,
	size,
}: {
	rating: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rating: number) => void
	locale?: Lang
	size?: number
}): React.JSX.Element {
	if (onClick !== undefined) {
		return (
			<div className="flex flex-row items-center justify-center gap-x-[0.875rem]">
				{Array.from({ length: 5 }).map((_, i) => (
					<button
						key={i}
						onClick={(e) => onClick(e, i + 1)}
						className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						aria-label={matchLang({
							[Lang.English]: `Set rating to ${i + 1} over 5`,
							[Lang.Vietnamese]: `Đặt đánh giá tới ${i + 1} trên 5`,
						})({ locale: locale ?? defaultLocale })}
					>
						<Heart
							fill={rating >= i + 1 ? '#925E12' : 'transparent'}
							className={cn(rating >= i + 1 && 'text-[#925E12]')}
							size={size}
						/>
					</button>
				))}
			</div>
		)
	}

	return (
		<div className="flex flex-row justify-center gap-x-[0.875rem]">
			{Array.from({ length: 5 }).map((_, i) => (
				<Heart
					key={i}
					fill={rating >= i + 1 ? '#925E12' : 'transparent'}
					className={cn(rating >= i + 1 && 'text-[#925E12]')}
					size={36}
				/>
			))}
		</div>
	)
}
