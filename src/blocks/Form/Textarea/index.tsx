import type { TextField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'

import { Error } from '../Error'
import { Width } from '../Width'

export function Textarea(
	props: TextField & {
		errors: Partial<FieldErrorsImpl>
		register: UseFormRegister<FieldValues>
		rows?: number
	},
): React.JSX.Element {
	return (
		<Width width={props.width}>
			<Label htmlFor={props.name}>
				{props.label}

				{props.required && (
					<span className="required">
						* <span className="sr-only">(required)</span>
					</span>
				)}
			</Label>

			<TextAreaComponent
				defaultValue={props.defaultValue}
				id={props.name}
				rows={props.rows ?? 3}
				{...props.register(props.name, { required: props.required })}
			/>

			{props.errors[props.name] && <Error name={props.name} />}
		</Width>
	)
}
