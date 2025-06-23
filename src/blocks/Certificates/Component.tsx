import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { CertificatesBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'

import { CertificatesBlockDefaults as defaults } from './defaults'

export function CertificatesBlock(
	props: CertificatesBlockProps & {
		__locale?: Lang
	},
): React.JSX.Element {
	return (
		<div className="flex w-full flex-col items-center justify-center py-16">
			<div className="mb-6 text-balance text-center font-serif text-5xl font-bold text-primary md:mb-16">
				{props.title ?? defaults.title(props.__locale)}
			</div>
			<div className="flex flex-col gap-6 md:grid md:w-5/6 md:max-w-7xl md:grid-cols-3">
				{props.organizations?.map((org, index) => {
					return (
						<div className="flex flex-col items-center gap-4 md:p-8" key={index}>
							<HeadlessImage
								media={org.logo}
								placeholder={{ width: 144, height: 144 }}
								className="aspect-square size-full max-h-36 max-w-36 object-contain"
							/>
							<div className="text-center font-serif text-5xl font-semibold leading-8 text-primary">
								{org.title}
							</div>
							<div className="text-balance text-center text-xl leading-8 text-primary max-md:hidden">
								{org.description}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
