import { DialogTitle } from '@/components/ui/dialog'
import { ContactFormGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_ContactFormClient } from './Component.client'
import { ContactFormGlobalSlug } from './config'

export async function ContactFormGlobalComponent({ inDialog }: { inDialog?: boolean }) {
	const global = (await getCachedGlobal(ContactFormGlobalSlug, 1)()) as ContactFormGlobal

	if (inDialog) {
		return (
			<>
				<DialogTitle className="sr-only">{global.title}</DialogTitle>
				<INTERNAL_ContactFormClient global={global} />
			</>
		)
	}
	return <INTERNAL_ContactFormClient global={global} />
}
