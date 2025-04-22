import { getCachedGlobal } from '@/utilities/getGlobals'

import { TextInput } from '@/components/ui/text-input'
import type { Footer } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Lato, Phudu } from 'next/font/google'
import Image from 'next/image'
import { DataFromGlobalSlug } from 'payload'

const lato = Lato({ subsets: ['latin'], weight: ['400'] })
const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600', '700'] })

export async function Footer() {
  const {
    contactUs,
    legal,
    image: images,
  }: Footer = (await getCachedGlobal('footer', 1)()) as DataFromGlobalSlug<'footer'>

  const image =
    images !== undefined && typeof images.image === 'object' && images.image !== null
      ? images.image
      : undefined

  const stamp =
    legal.stamp !== undefined && typeof legal.stamp === 'object' && legal.stamp !== null
      ? legal.stamp
      : undefined

  return (
    <footer className="relative flex overflow-hidden">
      <Image
        src={image?.url ?? 'https://placehold.co/1000x1000'}
        alt={image?.alt ?? 'Lanscape'}
        width={image?.width ?? 1000}
        height={image?.height ?? 1000}
        className="absolute top-1/2 h-full w-1/2 -translate-y-1/2 object-cover"
        unoptimized={image?.url === undefined}
      />

      <div className="w-1/2 translate-x-full">
        <div className="flex flex-col gap-6 px-28 py-[5.25rem]">
          {/* contact us */}
          <div className="font-serif text-7xl font-medium">{contactUs.title}</div>
          <TextInput label={contactUs.emailInputLabel} required />
          <div className={cn('text-xl font-normal leading-8 text-primary', lato.className)}>
            {contactUs.description}
          </div>
        </div>

        {/* legal stuffs */}
        <div className={'bg-[#210E0A] px-24 py-9 text-[#F1DAAE]'}>
          <div className={cn('mb-6 text-2xl font-bold uppercase leading-6', phudu.className)}>
            {legal.title}
          </div>
          <div className={cn('whitespace-pre text-base font-normal uppercase', phudu.className)}>
            {legal.content}
          </div>

          <Image
            src={stamp?.url ?? 'https://placehold.co/200x100'}
            alt={stamp?.alt ?? 'Đã thông báo bộ Công Thương'}
            width={stamp?.width ?? 200}
            height={stamp?.height ?? 100}
            className="my-6 max-h-14 w-fit object-contain"
            unoptimized={stamp?.url === undefined}
          />

          <div className="text-xs font-normal text-[#F1DAAE]">{legal.copyright}</div>
        </div>
      </div>
    </footer>
  )
}
