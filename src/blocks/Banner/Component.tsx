import React from 'react'
import type { BannerBlockProps } from 'src/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
	className?: string
} & BannerBlockProps

export function BannerBlockComponent(props: Props): React.JSX.Element {
	return (
		<div className={cn('mx-auto my-8 w-full', props.className)}>
			<div
				className={cn('flex items-center rounded border px-6 py-3', {
					'border-border bg-card': props.style === 'info',
					'border-error bg-error/30': props.style === 'error',
					'border-success bg-success/30': props.style === 'success',
					'border-warning bg-warning/30': props.style === 'warning',
				})}
			>
				<RichText data={props.content} enableGutter={false} enableProse={false} />
			</div>
		</div>
	)
}
