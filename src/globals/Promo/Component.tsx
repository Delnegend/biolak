import { DataFromGlobalSlug } from 'payload'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Promo(): Promise<React.JSX.Element> {
	const global = (await getCachedGlobal('promo', 1)()) as DataFromGlobalSlug<'promo'>
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
