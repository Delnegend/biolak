'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { createContext, useContext } from 'react'
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'

export const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

export const useFormField = () => {
	const fieldContext = useContext(FormFieldContext)
	const itemContext = useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

export function FormItem({
	className,
	...props
}: React.ComponentPropsWithRef<'div'>): React.JSX.Element {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div className={cn('space-y-2', className)} {...props} />
		</FormItemContext.Provider>
	)
}
FormItem.displayName = 'FormItem'

export function FormLabel({
	className,
	...props
}: React.ComponentPropsWithRef<typeof Label>): React.JSX.Element {
	const { error, formItemId } = useFormField()

	return (
		<Label
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}
FormLabel.displayName = 'FormLabel'

export function FormControl(props: React.ComponentPropsWithRef<typeof Slot>): React.JSX.Element {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			id={formItemId}
			aria-describedby={
				!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}
FormControl.displayName = 'FormControl'

export function FormDescription({
	className,
	...props
}: React.ComponentPropsWithRef<'p'>): React.JSX.Element {
	const { formDescriptionId } = useFormField()

	return (
		<p
			id={formDescriptionId}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
}
FormDescription.displayName = 'FormDescription'

export function FormMessage({
	className,
	children,
	...props
}: React.ComponentPropsWithRef<'p'>): React.JSX.Element | null {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message ?? '') : children

	if (!body) {
		return null
	}

	return (
		<p
			id={formMessageId}
			className={cn('text-sm font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	)
}
FormMessage.displayName = 'FormMessage'
