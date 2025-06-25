'use client'
import type { Form as FormType, FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { getClientSideURL } from '@/utilities/getURL'

import { fields } from './fields'

const cnsole = cnsoleBuilder('blocks/FormBlock')

export type FormBlockType = {
	blockName?: string
	blockType?: 'formBlock'
	enableIntro: boolean
	form: FormType
	introContent?: SerializedEditorState
}

export function FormBlock(props: FormBlockType): React.JSX.Element {
	const formMethods = useForm({
		defaultValues: props.form.fields,
	})
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = formMethods

	const [isLoading, setIsLoading] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState<boolean>()
	const [error, setError] = useState<{ message: string; status?: string } | undefined>()
	const router = useRouter()

	const onSubmit = useCallback(
		(data: FormFieldBlock[]) => {
			let loadingTimerID: ReturnType<typeof setTimeout>
			const submitForm = async () => {
				setError(undefined)

				const dataToSend = Object.entries(data).map(([name, value]) => ({
					field: name,
					value,
				}))

				// delay loading indicator by 1s
				loadingTimerID = setTimeout(() => {
					setIsLoading(true)
				}, 1000)

				try {
					const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
						body: JSON.stringify({
							form: props.form.id,
							submissionData: dataToSend,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
					})

					const res = await req.json()

					clearTimeout(loadingTimerID)

					if (req.status >= 400) {
						setIsLoading(false)

						setError({
							message: res.errors?.[0]?.message || 'Internal Server Error',
							status: res.status,
						})

						return
					}

					setIsLoading(false)
					setHasSubmitted(true)

					if (props.form.confirmationType === 'redirect' && props.form.redirect) {
						const redirectUrl = props.form.redirect.url

						if (redirectUrl) router.push(redirectUrl)
					}
				} catch (err) {
					cnsole.warn("Can't submit form:", err)
					setIsLoading(false)
					setError({
						message: 'Something went wrong.',
					})
				}
			}

			void submitForm()
		},
		[router, props.form.id, props.form.redirect, props.form.confirmationType],
	)

	return (
		<div className="container lg:max-w-[48rem]">
			{props.enableIntro && props.introContent && !hasSubmitted && (
				<RichText className="mb-8 lg:mb-12" data={props.introContent} enableGutter={false} />
			)}
			<div className="rounded-[0.8rem] border border-border p-4 lg:p-6">
				<FormProvider {...formMethods}>
					{!isLoading && hasSubmitted && props.form.confirmationType === 'message' && (
						<RichText data={props.form.confirmationMessage} />
					)}
					{isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
					{error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
					{!hasSubmitted && (
						<form id={props.form.id} onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4 last:mb-0">
								{props.form &&
									props.form.fields &&
									props.form.fields?.map((field, index) => {
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										const Field: React.FC<any> =
											fields?.[field.blockType as keyof typeof fields]
										if (Field) {
											return (
												<div className="mb-6 last:mb-0" key={index}>
													<Field
														form={props.form}
														{...field}
														{...formMethods}
														control={control}
														errors={errors}
														register={register}
													/>
												</div>
											)
										}
										return null
									})}
							</div>

							<Button form={props.form.id} type="submit" variant="default">
								{props.form.submitButtonLabel}
							</Button>
						</form>
					)}
				</FormProvider>
			</div>
		</div>
	)
}
