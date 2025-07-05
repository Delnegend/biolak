import { Menu } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import type { HeaderGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { NavItems } from '../components/NavItems'
import { INTERNAL_RenderNavItems } from '../components/RenderNavItems'
import { INTERNAL_SmallNavToggler } from './SmallNavToggler.client'

export function INTERNAL_SmallNav({
	locale,
	global,
	className,
}: {
	locale: Lang
	global?: HeaderGlobal | null
	className?: string
}): React.JSX.Element {
	return (
		<div className={cn('grid w-full grid-cols-3 items-center', className)}>
			<INTERNAL_SmallNavToggler
				toggler={
					<Button variant="outline" hideArrow className="size-14 border-transparent p-0">
						<Menu className="text-primary" />
					</Button>
				}
				className="border-t px-20 py-12"
			>
				<INTERNAL_RenderNavItems
					items={[...(global?.headerItemsLeft ?? []), ...(global?.headerItemsRight ?? [])]
						.filter((i) => i.prebuilt !== 'cart')
						.filter((i) => i.prebuilt !== 'search')}
					locale={locale}
					size="sm"
					className="flex flex-col items-start gap-y-1 text-2xl font-medium"
				/>
			</INTERNAL_SmallNavToggler>

			<Image
				width={96}
				height={49}
				src="/biolak-logo.svg"
				alt={matchLang({
					[Lang.English]: 'BioLAK Logo',
					[Lang.Vietnamese]: 'Logo BioLAK',
				})(locale)}
				className="h-10 w-auto place-self-center"
			/>
			<span className="place-self-end">{NavItems.cart({ locale, size: 'sm' })}</span>
		</div>
	)
}
