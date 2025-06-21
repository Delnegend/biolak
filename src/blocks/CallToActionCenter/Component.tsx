import { ArrowRight } from 'lucide-react'
import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CallToActionCenterBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'

import { CallToActionCenterBlockDefaults as defaults } from './defaults'

export function CallToActionCenterBlock(
	props: CallToActionCenterBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	const bgUrl =
		props.background && typeof props.background === 'object' && props.background.url
			? props.background.url
			: 'https://placehold.co/1920x1080'

	return (
		<div
			className="flex h-[60rem] items-center justify-center"
			style={{
				backgroundImage: `url(${bgUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Card className="flex w-5/6 max-w-[46rem] flex-col justify-center rounded-[0.5rem] border-none bg-primary-foreground p-12">
				<CardHeader>
					{props['sub-title'] && (
						<div className="text-center text-[2rem] font-bold text-primary">
							{props['sub-title']}
						</div>
					)}
					<CardTitle className="whitespace-pre-wrap text-center text-7xl font-bold leading-[4.5rem] text-primary">
						{props.title}
					</CardTitle>
					{props.description && (
						<RichText
							data={props.description}
							enableGutter={false}
							className="text-balance text-center text-2xl text-[#834621]"
						/>
					)}
				</CardHeader>
				<CardContent className="grid max-w-[38.5rem]">
					<Button
						size="lg"
						className="w-full max-w-[28rem] justify-between place-self-center"
						asChild
					>
						<CMSLink
							className="justify-between"
							{...props.link}
							type={props.link?.type ?? undefined}
							label={props.link?.label ?? defaults.buttonLabel(props.__locale)}
						>
							<ArrowRight />
						</CMSLink>
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
