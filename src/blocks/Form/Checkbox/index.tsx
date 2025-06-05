import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { Error } from '../Error'
import { Width } from '../Width'

export function Checkbox(
	props: CheckboxField & {
		errors: Partial<FieldErrorsImpl>
		register: UseFormRegister<FieldValues>
	},
): React.JSX.Element {
	const props_ = props.register(props.name, { required: props.required })
	const { setValue } = useFormContext()

	return (
		<Width width={props.width}>
			<div className="flex items-center gap-2">
				<CheckboxUi
					defaultChecked={props.defaultValue}
					id={props.name}
					{...props_}
					onCheckedChange={(checked) => {
						setValue(props_.name, checked)
					}}
				/>
				<Label htmlFor={props.name}>
					{props.required && (
						<span className="required">
							* <span className="sr-only">(required)</span>
						</span>
					)}
					{props.label}
				</Label>
			</div>
			{props.errors[props.name] && <Error name={props.name} />}
		</Width>
	)
}
