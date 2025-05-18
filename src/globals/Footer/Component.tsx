import { Phudu } from 'next/font/google'
import Image from 'next/image'

import { TextInput } from '@/components/ui/text-input'
import { FooterGlobal, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

import { FooterGlobalSlug } from './config'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600', '700'] })

export async function FooterComponent({ size }: { size?: 'small' | 'large' | 'medium' | null }) {
	const global = (await getCachedGlobal(FooterGlobalSlug, 1)()) as FooterGlobal

	const stamp =
		global.legal.stamp !== undefined &&
		typeof global.legal.stamp === 'object' &&
		global.legal.stamp !== null
			? global.legal.stamp
			: null

	switch (size) {
		case 'large':
			return <FooterLarge global={global} stamp={stamp} />
		case 'medium':
			return <FooterMedium global={global} stamp={stamp} />
		default:
			return <FooterSmall global={global} />
	}
}
async function FooterLarge({
	global: { contactUs, legal, image },
	stamp,
}: {
	global: FooterGlobal
	stamp?: Media | null
}): Promise<React.JSX.Element> {
	const img =
		image !== undefined && typeof image.image === 'object' && image.image !== null
			? image.image
			: null

	return (
		<footer className="relative flex overflow-hidden">
			<Image
				src={img?.url ?? 'https://placehold.co/1000x1000'}
				alt={img?.alt ?? 'Lanscape'}
				width={img?.width ?? 1000}
				height={img?.height ?? 1000}
				className="absolute top-1/2 h-full w-1/2 -translate-y-1/2 object-cover"
				unoptimized={!img}
			/>

			<div className="w-1/2 translate-x-full">
				<div className="flex flex-col gap-6 px-28 py-[5.25rem]">
					{/* contact us */}
					<div className="font-serif text-7xl font-medium">{contactUs.title}</div>
					<TextInput label={contactUs.emailInputLabel} required />
					<div className="text-xl font-normal leading-8 text-primary">
						{contactUs.description}
					</div>
				</div>

				{/* legal stuffs */}
				<div className={'bg-[#210E0A] px-24 py-9 text-[#F1DAAE]'}>
					<div className={cn('mb-6 text-2xl font-bold uppercase leading-6', phudu.className)}>
						{legal.title}
					</div>
					<div
						className={cn('whitespace-pre text-base font-normal uppercase', phudu.className)}
					>
						{legal.content}
					</div>

					<Image
						src={stamp?.url ?? 'https://placehold.co/200x100'}
						alt={stamp?.alt ?? 'Đã thông báo bộ Công Thương'}
						width={stamp?.width ?? 200}
						height={stamp?.height ?? 100}
						className="my-6 h-14 w-auto object-contain"
						unoptimized={!stamp}
					/>

					<div className="text-xs font-normal text-[#F1DAAE]">{legal.copyright}</div>
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
	return (
		<div
			className={cn(
				'grid grid-cols-2 bg-[#210E0A] px-24 py-16 text-[hsl(39,71%,81%)]',
				phudu.className,
			)}
		>
			<div>
				<div className="text-2xl font-bold">{global.legal.title}</div>
				<div className="whitespace-pre-wrap text-base">{global.legal.content}</div>
				<Image
					src={stamp?.url ?? 'https://placehold.co/200x100'}
					alt={stamp?.alt ?? 'Đã thông báo bộ Công Thương'}
					width={stamp?.width ?? 200}
					height={stamp?.height ?? 100}
					className="my-6 h-14 w-auto object-contain"
					unoptimized={!stamp}
				/>
			</div>

			<div>
				<div className="text-2xl font-bold">{global.legal.title}</div>
				<div className="whitespace-pre-wrap text-base">{global.legal.content}</div>
			</div>

			<div className="col-span-2">{global.legal.copyright}</div>
		</div>
	)
}

async function FooterSmall({ global }: { global: FooterGlobal }): Promise<React.JSX.Element> {
	return (
		<div className="bg-[#210E0A] py-11 text-center text-xs text-[#F1DAAE]">
			{global.legal.copyright}
		</div>
	)
}
