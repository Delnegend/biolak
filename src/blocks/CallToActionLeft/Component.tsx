import React from 'react'

import type { CallToActionLeftBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CallToActionLeftBlock(props: CallToActionLeftBlockProps): React.JSX.Element {
	const bgUrl =
		props.background && typeof props.background === 'object' && props.background.url
			? props.background.url
			: 'https://placehold.co/1920x1080'

	return (
		<div
			style={{
				backgroundImage: `url(${bgUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="safe-width">
				<div className="box-content flex max-w-[28rem] flex-col gap-6 py-24 pr-24">
					<div className="leading whitespace-pre-wrap font-serif text-8xl font-bold leading-[5rem] text-white">
						{props.title}
					</div>
					{props.description && (
						<RichText
							data={props.description}
							enableGutter={false}
							className="mx-0 text-balance text-xl leading-8 text-white"
						/>
					)}
					<Link
						href={props.button.link?.url ?? '#'}
						target={props.button.link?.newTab ? '_blank' : '_self'}
					>
						<Button className="w-full" size="lg">
							{props.button.text}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
