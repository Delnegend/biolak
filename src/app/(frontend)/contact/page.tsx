import { ContactForm } from '@/globals/ContactForm/Component'

export default async function Contact(): Promise<React.JSX.Element> {
	return (
		<div className="mx-auto my-28 w-full max-w-[932px]">
			<ContactForm />
		</div>
	)
}
