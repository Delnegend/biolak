import clsx from 'clsx'
import React from 'react'

export function Logo(props: {
	className?: string
	loading?: 'lazy' | 'eager'
	priority?: 'auto' | 'high' | 'low'
}): React.JSX.Element {
	const { loading: loadingFromProps, priority: priorityFromProps, className } = props

	const loading = loadingFromProps || 'lazy'
	const priority = priorityFromProps || 'low'

	return (
		/* eslint-disable @next/next/no-img-element */
		<img
			alt="BioLAK Logo"
			width={96}
			height={49}
			loading={loading}
			fetchPriority={priority}
			decoding="async"
			className={clsx('h-[34px] w-full max-w-[9.375rem]', className)}
			src="/biolak-logo.svg"
		/>
	)
}
