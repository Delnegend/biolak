'use client'

import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { CartListClient } from '@/components/CartList.client'
import { cn } from '@/utilities/ui'

export function INTERNAl_CartListWithAccordion({
	syncWithLocalStorage,
}: {
	syncWithLocalStorage: boolean
}): React.JSX.Element {
	const t = useTranslations('globals.checkout')
	const [open, setOpen] = useState(true)

	return (
		<div>
			<div
				className={cn('grid transition-all', {
					'grid-rows-[1fr]': open,
					'grid-rows-[0fr]': !open,
				})}
			>
				<CartListClient
					showCheckbox={false}
					className="mb-4 min-h-0 overflow-hidden"
					syncWithLocalStorage={syncWithLocalStorage}
				/>
			</div>

			<button
				className="!flex w-full flex-row items-center justify-between font-sans text-xl"
				aria-label={t('toggleCartDetails')}
				onClick={(e) => {
					e.preventDefault()
					setOpen((prev) => !prev)
				}}
			>
				{t(open ? 'hideDetails' : 'cartDetails')}
				<ChevronDown
					className={cn('transition-all', {
						'rotate-180': open,
						'rotate-0': !open,
					})}
				/>
			</button>
		</div>
	)
}
