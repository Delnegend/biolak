import { DialogTitle } from '@/components/ui/dialog'
import { Lang } from '@/i18n/routing'
import { ContactFormGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_ContactFormClient } from './Component.client'
import { ContactFormGlobalSlug } from './config'
import { ContactFormGlobalDefaults as defaults } from './defaults'

export async function ContactFormGlobalComponent(props: { inDialog?: boolean; locale: Lang }) {
	const global = await getCachedGlobal<ContactFormGlobal>(
		ContactFormGlobalSlug,
		1,
		props.locale,
	)()

	if (props.inDialog) {
		return (
			<>
				<DialogTitle className="sr-only">
					{global.title ?? defaults.title(props.locale)}
				</DialogTitle>
				<INTERNAL_ContactFormClient global={global} />
			</>
		)
	}
	return <INTERNAL_ContactFormClient global={global} />
}
