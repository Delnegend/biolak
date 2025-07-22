import React from 'react'

import RichText from '@/components/RichText'
import type { BannerBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { cn } from '@/utilities/ui'

type Props = {
	className?: string
	__locale: Lang
} & BannerBlockProps

export function BannerBlock(props: Props): React.JSX.Element {
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
				<RichText
					data={props.content}
					enableGutter={false}
					enableProse={false}
					locale={props.__locale}
				/>
			</div>
		</div>
	)
}
