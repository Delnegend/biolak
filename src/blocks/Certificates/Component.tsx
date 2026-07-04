import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Lang } from '@/i18n/routing'
import { CertificatesBlockProps } from '@/payload-types'

export async function CertificatesBlock(
	props: CertificatesBlockProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.certificates' })

	return (
		<div className="safe-width flex w-full flex-col items-center justify-center max-lg:my-6 lg:my-16">
			<div className="mb-6 text-balance text-center font-serif text-5xl font-bold text-primary md:mb-16">
				{props.title ?? t('title')}
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
