import { DataFromGlobalSlug } from 'payload'

import { DialogTitle } from '@/components/ui/dialog'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { ContactFormCC } from './Component.client'

export async function ContactForm({ inDialog }: { inDialog?: boolean }) {
	const data = (await getCachedGlobal('contact-form', 1)()) as DataFromGlobalSlug<'contact-form'>

	if (inDialog) {
		return (
			<>
				<DialogTitle className="sr-only">{data.title}</DialogTitle>
				<ContactFormCC data={data} />
			</>
		)
	}
	return <ContactFormCC data={data} />
}
