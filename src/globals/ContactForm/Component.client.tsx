'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TextInput } from '@/components/ui/text-input'
import { useClientLang } from '@/hooks/useClientLang'
import { ContactFormGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import {
	type ContactFormInputType,
	submitContactFormAction,
} from './actions/submitContactFormAction'

export function INTERNAL_ContactFormClient({ global }: { global: ContactFormGlobal }) {
	const { register, handleSubmit } = useForm<ContactFormInputType>()
	const { lang: locale } = useClientLang()

	const onSubmit: SubmitHandler<ContactFormInputType> = (data) => {
		void (async (): Promise<void> => {
			const response = await submitContactFormAction(data)
			if (response.success) {
				toast.success(
					matchLang({
						[Lang.English]: 'BioLAK has received your feedback',
						[Lang.Vietnamese]: 'BioLAK đã nhận đuợc phản hồi của bạn',
					})({ locale }),
				)
				return
			}
			let description = ''
			if (response.errors instanceof ZodError) {
				description = response.errors.message
			} else {
				description = `${response.errors}`
			}
			toast.error(
				matchLang({
					[Lang.English]: 'Unable to send feedback',
					[Lang.Vietnamese]: 'Không thể gửi phản hồi',
				})({ locale }),
				{
					description,
				},
			)
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
					<Button
						className="pointer-events-none w-full justify-between"
						variant="outline"
						size="lg"
						asChild
					>
						<Link href={`tel:${global.biolakPhoneNumber}`} tabIndex={-1}>
							{global.actionCall}
						</Link>
						<ArrowRight />
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
