import { CMSLink } from '@/components/CMSLink'
import { PromoGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { PromoGlobalSlug } from './config'

export async function PromoGlobalComponent(): Promise<React.JSX.Element> {
	const locale = await getClientLang()
	const global = await getCachedGlobal<PromoGlobal>(PromoGlobalSlug, 1, locale)()
	if (!global.message) return <></>

	return (
		<div className="sticky top-0 flex h-10 w-full items-center justify-center bg-black text-primary-foreground">
			<CMSLink
				className="underline-offset-2 hover:underline"
				{...global.link}
				type={global.link.type ?? undefined}
			>
				{global.message}
			</CMSLink>
		</div>
	)
}
