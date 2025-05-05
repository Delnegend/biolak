import * as React from 'react'

export function Width(props: {
	children: React.ReactNode
	className?: string
	width?: number | string
}): React.JSX.Element {
	return (
		<div
			className={props.className}
			style={{ maxWidth: props.width ? `${props.width}%` : undefined }}
		>
			{props.children}
		</div>
	)
}
