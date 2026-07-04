'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod/v4'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TextInput } from '@/components/ui/text-input'
import { ContactFormGlobal } from '@/payload-types'

import {
	type ContactFormInputType,
	submitContactFormAction,
} from './actions/submitContactFormAction'

export function INTERNAL_ContactFormClient({ global }: { global: ContactFormGlobal }) {
	const t = useTranslations('globals.contactForm')
	const { register, handleSubmit } = useForm<ContactFormInputType>()

	const onSubmit: SubmitHandler<ContactFormInputType> = (data) => {
		void (async (): Promise<void> => {
			const response = await submitContactFormAction(data)
			if (response.success) {
				toast.success(t('toastSuccess'))
				return
			}
			let description = ''
			if (response.errors instanceof ZodError) {
				description = response.errors.message
			} else {
				description = `${response.errors}`
			}
			toast.error(t('toastError'), {
				description,
			})
		})()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card className="flex flex-col gap-[4.5rem] border-none bg-transparent">
				<CardHeader className="p-0">
					<CardTitle className="h-[70px] font-serif text-4xl">
						{global.title ?? t('title')}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="grid grid-cols-2 gap-9">
						<TextInput label={global.name ?? t('name')} {...register('username')} />
						<TextInput
							label={global.phoneNumber ?? t('phoneNumber')}
							{...register('phoneNumber')}
						/>
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={global.email ?? t('email')}
							type="email"
							{...register('email')}
						/>
						<TextInput
							classNames={{ container: 'col-span-2' }}
							label={global.question ?? t('question')}
							{...register('message')}
						/>
					</div>
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-5 p-0">
					<Button size="lg" type="submit">
						{global.actionSend ?? t('actionSend')}
					</Button>
					<Button
						className="pointer-events-none w-full justify-between"
						variant="outline"
						size="lg"
						asChild
					>
						<Link href={`tel:${global.biolakPhoneNumber}`} tabIndex={-1}>
							{global.actionCall ?? t('actionCall')}
							<ArrowRight />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
