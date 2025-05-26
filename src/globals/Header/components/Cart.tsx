'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export function INTERNAL_Cart({
	label,
	locale,
}: {
	label?: string
	locale: Lang
}): React.JSX.Element {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="default"
					className="relative h-14 rounded-full bg-primary px-6 !font-sans text-xl font-medium"
					hideArrow={true}
				>
					{label ??
						matchLang({ [Lang.English]: 'Cart', [Lang.Vietnamese]: 'Giỏ hàng' })({ locale })}
					<div className="absolute -top-2 right-0 flex aspect-square size-7 items-center justify-center overflow-hidden rounded-full bg-[#FF8200] text-base text-primary">
						10
					</div>
				</Button>
			</SheetTrigger>
			<SheetContent></SheetContent>
		</Sheet>
	)
}
