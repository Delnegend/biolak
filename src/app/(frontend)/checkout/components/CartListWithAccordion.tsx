'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { CartListClient } from '@/components/CartList.client'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

export function INTERNAl_CartListWithAccordion({
	locale,
	syncWithLocalStorage,
}: {
	locale: Lang
	syncWithLocalStorage: boolean
}): React.JSX.Element {
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
					locale={locale}
					syncWithLocalStorage={syncWithLocalStorage}
				/>
			</div>

			<button
				className="!flex w-full flex-row items-center justify-between font-sans text-xl"
				aria-label={matchLang({
					[Lang.English]: 'Toggle cart details',
					[Lang.Vietnamese]: 'Ẩn hiện chi tiết giỏ hàng',
				})(locale)}
				onClick={(e) => {
					e.preventDefault()
					setOpen((prev) => !prev)
				}}
			>
				{matchLang({
					[Lang.English]: open ? 'Hide details' : 'Cart details',
					[Lang.Vietnamese]: open ? 'Ẩn chi tiết' : 'Chi tiết giỏ hàng',
				})(locale)}
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
