import { Phudu } from 'next/font/google'
import Image from 'next/image'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { TextInput } from '@/components/ui/text-input'
import { FooterGlobal, Media } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { FooterGlobalSlug } from './config'
import { FooterGlobalDefaults as defaults } from './defaults'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600', '700'] })

export async function FooterGlobalComponent({
	size,
}: {
	size?: 'small' | 'large' | 'medium' | null
}) {
	const locale = await getClientLang()
	const global = await getCachedGlobal<FooterGlobal>(FooterGlobalSlug, 1, locale)()

	switch (size) {
		case 'large':
			return <FooterLarge global={global} locale={locale} />
		case 'medium':
			return <FooterMedium global={global} locale={locale} />
		default:
			return <FooterSmall global={global} />
	}
}
async function FooterLarge({
	global: { contactUs, legal, image },
	locale,
}: {
	global: FooterGlobal
	locale: Lang
}): Promise<React.JSX.Element> {
	return (
		<footer className="relative flex overflow-hidden max-lg:flex-col">
			<HeadlessImage
				media={image?.image}
				alt={matchLang({
					[Lang.English]: 'Lanscape Image',
					[Lang.Vietnamese]: 'Ảnh Lanscape',
				})(locale)}
				placeholder={{ width: 1000, height: 1000 }}
				className="h-full object-cover max-lg:w-full lg:absolute lg:top-1/2 lg:w-1/2 lg:-translate-y-1/2"
			/>

			<div className="lg:w-1/2 lg:translate-x-full">
				<div className="flex flex-col gap-6 max-lg:px-4 max-lg:py-6 lg:px-28 lg:py-[5.25rem]">
					{/* contact us */}
					<div className="font-serif text-7xl font-medium max-lg:text-[2.5rem]">
						{contactUs?.title ?? defaults.contactUs.title(locale)}
					</div>
					<TextInput
						classNames={{ container: 'lg:hidden' }}
						size="sm"
						label={contactUs?.emailInputLabel ?? defaults.contactUs.emailInputLabel(locale)}
						required
					/>
					<TextInput
						classNames={{ container: 'max-lg:hidden' }}
						size="lg"
						label={contactUs?.emailInputLabel ?? defaults.contactUs.emailInputLabel(locale)}
						required
					/>
					<div className="text-xl font-normal leading-8 text-primary">
						{contactUs?.description ?? defaults.contactUs.description(locale)}
					</div>
				</div>

				{/* legal stuffs */}
				<div className="bg-[#210E0A] px-24 py-9 text-[#F1DAAE] max-lg:px-4 max-lg:py-6">
					<div className={cn('mb-6 text-2xl font-bold uppercase leading-6', phudu.className)}>
						{legal?.title ?? defaults.legal.title(locale)}
					</div>
					<div
						className={cn(
							'whitespace-pre-wrap text-base font-normal uppercase',
							phudu.className,
						)}
					>
						{legal?.content ?? defaults.legal.content(locale)}
					</div>

					<Image
						src="/bo-cong-thuong.webp"
						alt={matchLang({
							[Lang.English]: 'Noticed by the Board of Directors',
							[Lang.Vietnamese]: 'Đã thông báo bộ Công Thương',
						})(locale)}
						className="my-6 h-14 w-auto object-contain"
						quality={90}
					/>

					<div className="text-xs font-normal text-[#F1DAAE]">{legal?.copyright}</div>
				</div>
			</div>
		</footer>
	)
}

async function FooterMedium({
	global,
	locale,
	stamp,
}: {
	global: FooterGlobal
	locale: Lang
	stamp?: Media | null
}): Promise<React.JSX.Element> {
	return (
		<div
			className={cn(
				'grid grid-cols-2 bg-[#210E0A] px-24 py-16 text-[hsl(39,71%,81%)]',
				phudu.className,
			)}
		>
			<div>
				<div className="text-2xl font-bold">
					{global.legal?.title ?? defaults.legal.title(locale)}
				</div>
				<div className="whitespace-pre-wrap text-base">
					{global.legal?.content ?? defaults.legal.content(locale)}
				</div>
				<HeadlessImage
					media={stamp}
					alt={matchLang({
						[Lang.English]: 'Noticed by the Board of Directors',
						[Lang.Vietnamese]: 'Đã thông báo bộ Công Thương',
					})(locale)}
					placeholder={{ width: 200, height: 100 }}
					className="my-6 h-14 w-auto object-contain"
				/>
			</div>

			<div>
				<div className="text-2xl font-bold">
					{global.legal?.title ?? defaults.legal.title(locale)}
				</div>
				<div className="whitespace-pre-wrap text-base">
					{global.legal?.content ?? defaults.legal.content(locale)}
				</div>
			</div>

			<div className="col-span-2">
				{global.legal?.copyright ?? defaults.legal.copyright(locale)}
			</div>
		</div>
	)
}

async function FooterSmall({ global }: { global: FooterGlobal }): Promise<React.JSX.Element> {
	return (
		<div className="bg-[#210E0A] py-11 text-center text-xs text-[#F1DAAE]">
			{global.legal?.copyright ?? defaults.legal.copyright(Lang.Vietnamese)}
		</div>
	)
}
