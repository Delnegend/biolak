import { ContactFormGlobalComponent } from '@/globals/ContactForm/Component'
import { Lang } from '@/i18n/routing'

export default async function Contact({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<React.JSX.Element> {
	const locale = (await params).locale as Lang
	return (
		<div className="mx-auto my-28 w-full max-w-[932px]">
			<ContactFormGlobalComponent locale={locale} />
		</div>
	)
}
