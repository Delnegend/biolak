import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import type { Control, FieldErrorsImpl } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { Error } from '../Error'
import { Width } from '../Width'
import { countryOptions } from './options'

export function Country(
	props: CountryField & {
		control: Control
		errors: Partial<FieldErrorsImpl>
	},
): React.JSX.Element {
	return (
		<Width width={props.width}>
			<Label className="" htmlFor={props.name}>
				{props.label}

				{props.required && (
					<span className="required">
						* <span className="sr-only">(required)</span>
					</span>
				)}
			</Label>
			<Controller
				control={props.control}
				defaultValue=""
				name={props.name}
				render={({ field: { onChange, value } }) => {
					const controlledValue = countryOptions.find((t) => t.value === value)

					return (
						<Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
							<SelectTrigger className="w-full" id={props.name}>
								<SelectValue placeholder={props.label} />
							</SelectTrigger>
							<SelectContent>
								{countryOptions.map(({ label, value }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
					)
				}}
				rules={{ required: props.required }}
			/>
			{props.errors[props.name] && <Error name={props.name} />}
		</Width>
	)
}
