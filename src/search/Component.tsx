'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Label } from '@/components/ui/label'
import { TextInput } from '@/components/ui/text-input'
import { useDebounce } from '@/utilities/useDebounce'

export function Search(): React.JSX.Element {
	const [value, setValue] = useState('')
	const router = useRouter()
	const t = useTranslations('search')

	const debouncedValue = useDebounce(value)

	useEffect(() => {
		router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
	}, [debouncedValue, router])

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<Label htmlFor="search" className="sr-only">
					{t('placeholder')}
				</Label>
				<TextInput
					label={t('label')}
					id="search"
					onChange={(event) => {
						setValue(event.target.value)
					}}
				/>
				<button type="submit" className="sr-only">
					submit
				</button>
			</form>
		</div>
	)
}
