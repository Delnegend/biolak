import { CMSLink } from '@/components/CMSLink'
import { PromoGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { PromoGlobalSlug } from './config'

export async function PromoGlobalComponent(): Promise<React.JSX.Element> {
	const global = (await getCachedGlobal(PromoGlobalSlug, 1)()) as PromoGlobal
	if (!global.message) return <></>

	return (
		<div className="flex h-10 w-full items-center justify-center bg-black text-primary-foreground">
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
