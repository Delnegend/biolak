'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export function Error({ name }: { name: string }): React.JSX.Element {
	const {
		formState: { errors },
	} = useFormContext()
	return (
		<div className="mt-2 text-sm text-red-500">
			{(errors[name]?.message as string) || 'This field is required'}
		</div>
	)
}
