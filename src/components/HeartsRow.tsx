'use client'

import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/utilities/ui'

export function HeartsRow({
	rating,
	onClick,
	size,
}: {
	rating: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rating: number) => void
	size?: number
}): React.JSX.Element {
	const t = useTranslations('components.heartsRow')

	if (onClick !== undefined) {
		return (
			<div className="flex flex-row items-center justify-center gap-x-[0.875rem]">
				{Array.from({ length: 5 }).map((_, i) => (
					<button
						key={i}
						onClick={(e) => onClick(e, i + 1)}
						className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						aria-label={t('setRating', { n: i + 1 })}
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
