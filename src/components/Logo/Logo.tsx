import clsx from 'clsx'
import React from 'react'

// export const Logo = (props: Props) => {
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
			alt="Payload Logo"
			width={193}
			height={34}
			loading={loading}
			fetchPriority={priority}
			decoding="async"
			className={clsx('h-[34px] w-full max-w-[9.375rem]', className)}
			src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
		/>
	)
}
