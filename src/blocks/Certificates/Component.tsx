import { DM_Sans } from 'next/font/google'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { CertificatesBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { cn } from '@/utilities/ui'

import { CertificatesBlockDefaults as defaults } from './defaults'

const dmsans = DM_Sans({
	subsets: ['latin'],
	weight: ['400'],
})

export function CertificatesBlock(
	props: CertificatesBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	return (
		<div className="flex w-full flex-col items-center justify-center border-t border-black py-16">
			<div className="mb-16 text-balance text-center font-serif text-5xl font-bold text-primary">
				{props.title ?? defaults.title(props.__locale)}
			</div>
			<div className="grid w-5/6 max-w-7xl grid-cols-3 gap-6">
				{props.organizations?.map((org, index) => {
					return (
						<div className="flex flex-col items-center gap-4 p-8" key={index}>
							<HeadlessImage
								media={org.logo}
								placeholder={{ width: 144, height: 144 }}
								className="aspect-square size-full max-h-36 max-w-36 object-contain"
							/>
							<div className="text-center font-serif text-5xl font-semibold leading-8 text-primary">
								{org.title}
							</div>
							<div
								className={cn(
									dmsans.className,
									'text-balance text-center text-xl leading-8 text-primary',
								)}
							>
								{org.description}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
