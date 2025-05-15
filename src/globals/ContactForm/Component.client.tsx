'use client'

import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TextInput } from '@/components/ui/text-input'
import { ContactFormGlobal } from '@/payload-types'

import { type ContactFormInputType, submitContactForm } from './actions/submitContactForm'

export function ContactFormClient({ global }: { global: ContactFormGlobal }) {
	const { register, handleSubmit } = useForm<ContactFormInputType>()
	const onSubmit: SubmitHandler<ContactFormInputType> = (data) => {
		void (async (): Promise<void> => {
			const response = await submitContactForm(data)
			if (response.success) {
				toast.success('BioLAK đã nhận đuợc câu hỏi của bạn!')
				return
			}
			let description = ''
			if (response.errors instanceof ZodError) {
				for (const error of response.errors.errors) {
					description += `${error.path.join('.')} ${error.message}\n`
				}
			} else {
				description = `${response.errors}`
			}
			toast.error('Không thể gửi biểu mẫu!', {
				description,
			})
		})()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className="flex flex-col gap-[4.5rem] border-none bg-transparent">
				<CardHeader className="p-0">
					<CardTitle className="h-[70px] font-serif text-4xl">{global.title}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="grid grid-cols-2 gap-9">
						<TextInput label={global.name} {...register('username')} />
						<TextInput label={global.phoneNumber} {...register('phoneNumber')} />
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={global.email}
							type="email"
							{...register('email')}
						/>
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={global.question}
							{...register('message')}
						/>
					</div>
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-5 p-0">
					<Button size="lg" type="submit">
						{global.actionSend}
					</Button>
					<Link href={`tel:${global.biolakPhoneNumber}`} tabIndex={-1}>
						<Button className="pointer-events-none w-full" variant="outline" size="lg">
							{global.actionCall}
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</form>
	)
}
