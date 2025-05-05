import type { TextField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'

export function Number(
	props: TextField & {
		errors: Partial<FieldErrorsImpl>
		register: UseFormRegister<FieldValues>
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
			<Input
				defaultValue={props.defaultValue}
				id={props.name}
				type="number"
				{...props.register(props.name, { required: props.required })}
			/>
			{props.errors[props.name] && <Error name={props.name} />}
		</Width>
	)
}
