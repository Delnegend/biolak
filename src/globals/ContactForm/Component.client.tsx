'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TextInput } from '@/components/ui/text-input'
import { ContactFormGlobal } from '@/payload-types'

import { type ContactFormInputType, submitContactForm } from './actions/submitContactForm'

export function ContactFormClient({ data }: { data: ContactFormGlobal }) {
	const { register, handleSubmit } = useForm<ContactFormInputType>()

	return (
		<Card className="flex flex-col gap-[4.5rem] border-none bg-transparent">
			<CardHeader className="p-0">
				<CardTitle className="h-[70px] font-serif text-4xl">{data.title}</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<form onSubmit={handleSubmit(submitContactForm)}>
					<div className="grid grid-cols-2 gap-9">
						<TextInput label={data.name} {...register('username')} />
						<TextInput label={data.phoneNumber} {...register('phoneNumber')} />
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={data.email}
							type="email"
							{...register('email')}
						/>
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={data.question}
							{...register('message')}
						/>
					</div>
				</form>
			</CardContent>
			<CardFooter className="grid grid-cols-2 gap-5 p-0">
				<Button onClick={handleSubmit(submitContactForm)} size="lg">
					{data.actionSend}
				</Button>
				<Link href={`tel:${data.biolakPhoneNumber}`} tabIndex={-1}>
					<Button className="pointer-events-none w-full" variant="outline" size="lg">
						{data.actionCall}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
