import Image from 'next/image'
import Link from 'next/link'

import { HeaderGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { INTERNAL_RenderNavItems } from '../components/RenderNavItems'

export function INTERNAL_LargeNav({
	locale,
	global,
	className,
}: {
	locale: Lang
	global?: HeaderGlobal | null
	className: string
}): React.JSX.Element {
	return (
		<div className={cn('grid w-full grid-cols-[1fr_auto_1fr] gap-x-6', className)}>
			<div className="content-center overflow-x-auto">
				{' '}
				<INTERNAL_RenderNavItems
					items={global?.headerItemsLeft ?? []}
					locale={locale}
					size="lg"
				/>
			</div>

			<Link href="/home" className="self-center">
				<Image
					src="/biolak-logo.svg"
					alt={matchLang({
						[Lang.English]: 'BioLAK Logo',
						[Lang.Vietnamese]: 'Logo BioLAK',
					})(locale)}
					className="h-10 w-auto"
					width={96}
					height={49}
				/>
			</Link>

			<div className="overflow-hidden">
				<INTERNAL_RenderNavItems
					items={(global?.headerItemsRight ?? []).reverse()}
					locale={locale}
					size="lg"
					className="content-center overflow-x-auto max-md:flex-col-reverse md:flex-row-reverse"
				/>
			</div>
		</div>
	)
}
