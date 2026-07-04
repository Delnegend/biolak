import { getTranslations } from 'next-intl/server'

import { DialogTitle } from '@/components/ui/dialog'
import { Lang } from '@/i18n/routing'
import { ContactFormGlobal } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { INTERNAL_ContactFormClient } from './Component.client'
import { ContactFormGlobalSlug } from './config'

export async function ContactFormGlobalComponent(props: { inDialog?: boolean; locale: Lang }) {
	const global = await getCachedGlobal<ContactFormGlobal>(
		ContactFormGlobalSlug,
		1,
		props.locale,
	)()
	const t = await getTranslations({ locale: props.locale, namespace: 'globals.contactForm' })

	if (props.inDialog) {
		return (
			<>
				<DialogTitle className="sr-only">{global.title ?? t('title')}</DialogTitle>
				<INTERNAL_ContactFormClient global={global} />
			</>
		)
	}
	return <INTERNAL_ContactFormClient global={global} />
}
