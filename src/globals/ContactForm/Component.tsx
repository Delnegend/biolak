import { DialogTitle } from '@/components/ui/dialog'
import { ContactFormGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { ContactFormClient } from './Component.client'
import { ContactFormGlobalSlug } from './config'

export async function ContactForm({ inDialog }: { inDialog?: boolean }) {
	const global = (await getCachedGlobal(ContactFormGlobalSlug, 1)()) as ContactFormGlobal

	if (inDialog) {
		return (
			<>
				<DialogTitle className="sr-only">{global.title}</DialogTitle>
				<ContactFormClient global={global} />
			</>
		)
	}
	return <ContactFormClient global={global} />
}
