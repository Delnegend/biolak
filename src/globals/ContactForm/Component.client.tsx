'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TextInput } from '@/components/ui/text-input'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'
import { SubmitHandler, useForm } from 'react-hook-form'

type IFormInput = {
	name: string
	phoneNumber: string
	email: string
	question: string
}

export function ContactFormCC({ data }: { data: DataFromGlobalSlug<'contact-form'> }) {
	const { register, handleSubmit } = useForm<IFormInput>()
	const onSubmit: SubmitHandler<IFormInput> = async (data) => console.log(data)

	return (
		<Card className="flex flex-col gap-[4.5rem] border-none bg-transparent">
			<CardHeader className="p-0">
				<CardTitle className="h-[70px] font-serif text-4xl">{data.title}</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-9">
						<TextInput label={data.name} {...register('name')} />
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
							{...register('question')}
						/>
					</div>
				</form>
			</CardContent>
			<CardFooter className="grid grid-cols-2 gap-5 p-0">
				<Button onClick={handleSubmit(onSubmit)} size="lg">
					{data.actionSend}
				</Button>
				<Link href={`tel:${data.biolakPhoneNumber}`}>
					<Button className="pointer-events-none w-full" variant="outline" size="lg">
						{data.actionCall}
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
