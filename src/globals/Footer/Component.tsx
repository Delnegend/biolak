import { Phudu } from 'next/font/google'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { TextInput } from '@/components/ui/text-input'
import { Lang } from '@/i18n/routing'
import { FooterGlobal, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

import { FooterGlobalSlug } from './config'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600', '700'] })

export async function FooterGlobalComponent(props: {
	size?: 'small' | 'large' | 'medium' | null
	locale: Lang
}): Promise<React.JSX.Element> {
	const global = await getCachedGlobal<FooterGlobal>(FooterGlobalSlug, 1, props.locale)()

	switch (props.size) {
		case 'large':
			return <FooterLarge global={global} />
		case 'medium':
			return <FooterMedium global={global} />
		default:
			return <FooterSmall global={global} />
	}
}
async function FooterLarge({
	global: { contactUs, legal, image },
}: {
	global: FooterGlobal
}): Promise<React.JSX.Element> {
	const t = await getTranslations('globals.footer')
	return (
		<footer className="relative flex overflow-hidden max-lg:flex-col">
			<HeadlessImage
				media={image?.image}
				alt={t('imageAlt.large')}
				placeholder={{ width: 1000, height: 1000 }}
				className="h-full object-cover max-lg:w-full lg:absolute lg:top-1/2 lg:w-1/2 lg:-translate-y-1/2"
			/>

			<div className="lg:w-1/2 lg:translate-x-full">
				<div className="flex flex-col gap-6 max-lg:px-4 max-lg:py-6 lg:px-28 lg:py-[5.25rem]">
					{/* contact us */}
					<div className="font-serif text-7xl font-medium max-lg:text-[2.5rem]">
						{contactUs?.title ?? t('contactUs.title')}
					</div>
					<TextInput
						classNames={{ container: 'lg:hidden' }}
						size="sm"
						label={contactUs?.emailInputLabel ?? t('contactUs.emailInputLabel')}
						required
					/>
					<TextInput
						classNames={{ container: 'max-lg:hidden' }}
						size="lg"
						label={contactUs?.emailInputLabel ?? t('contactUs.emailInputLabel')}
						required
					/>
					<div className="text-xl font-normal leading-8 text-primary">
						{contactUs?.description ?? t('contactUs.description')}
					</div>
				</div>

				{/* legal stuffs */}
				<div className="bg-[#210E0A] px-24 py-9 text-[#F1DAAE] max-lg:px-4 max-lg:py-6">
					<div
						className={cn(
							'mb-6 text-2xl font-bold uppercase leading-6',
							phudu.className,
						)}
					>
						{legal?.title ?? t('legal.title')}
					</div>
					<div
						className={cn(
							'whitespace-pre-wrap text-base font-normal uppercase',
							phudu.className,
						)}
					>
						{legal?.content ?? t('legal.content')}
					</div>

					<Image
						src="/bo-cong-thuong.webp"
						alt={t('imageAlt.stamp')}
						className="my-6 h-14 w-auto object-contain"
						quality={90}
						width={600}
						height={227}
					/>

					<div className="text-xs font-normal text-[#F1DAAE]">{legal?.copyright}</div>
				</div>
			</div>
		</footer>
	)
}

async function FooterMedium({
	global,
	stamp,
}: {
	global: FooterGlobal
	stamp?: Media | null
}): Promise<React.JSX.Element> {
	const t = await getTranslations('globals.footer')
	return (
		<div
			className={cn(
				'grid grid-cols-2 bg-[#210E0A] px-24 py-16 text-[hsl(39,71%,81%)]',
				phudu.className,
			)}
		>
			<div>
				<div className="text-2xl font-bold">{global.legal?.title ?? t('legal.title')}</div>
				<div className="whitespace-pre-wrap text-base">
					{global.legal?.content ?? t('legal.content')}
				</div>
				<HeadlessImage
					media={stamp}
					alt={t('imageAlt.stamp')}
					placeholder={{ width: 200, height: 100 }}
					className="my-6 h-14 w-auto object-contain"
				/>
			</div>

			<div>
				<div className="text-2xl font-bold">{global.legal?.title ?? t('legal.title')}</div>
				<div className="whitespace-pre-wrap text-base">
					{global.legal?.content ?? t('legal.content')}
				</div>
			</div>

			<div className="col-span-2">{global.legal?.copyright ?? t('legal.copyright')}</div>
		</div>
	)
}

async function FooterSmall({ global }: { global: FooterGlobal }): Promise<React.JSX.Element> {
	const t = await getTranslations('globals.footer')
	return (
		<div className="bg-[#210E0A] py-11 text-center text-xs text-[#F1DAAE]">
			{global.legal?.copyright ?? t('legal.copyright')}
		</div>
	)
}
