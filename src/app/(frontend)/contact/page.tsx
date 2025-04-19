import { ContactForm } from '@/globals/ContactForm/Component'

export default async function Contact(): Promise<React.JSX.Element> {
  return (
    <div className="max-w-[932px] w-full mx-auto my-28">
      <ContactForm />
    </div>
  )
}
