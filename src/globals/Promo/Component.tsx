import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'

export async function Promo(): Promise<React.JSX.Element> {
  const promoData = (await getCachedGlobal('promo', 1)()) as DataFromGlobalSlug<'promo'>

  let target = promoData.link.url
  let internalLink = false
  if (
    !target &&
    typeof promoData.link.reference?.value === 'object' &&
    'slug' in promoData.link.reference.value &&
    !!promoData.link.reference.value.slug
  ) {
    target = `/${promoData.link.reference.value.slug}`
    internalLink = true
  }

  if (!promoData.message) return <></>

  if (target && !internalLink) {
    return (
      <div className="h-10 w-full flex items-center justify-center bg-black text-[#FFF9ED]">
        <a
          target={promoData.link.newTab ? '_blank' : '_self'}
          href={target}
          className="hover:underline underline-offset-2"
        >
          {promoData.message}
        </a>
      </div>
    )
  }

  if (target && internalLink) {
    return (
      <div className="h-10 w-full flex items-center justify-center bg-black text-[#FFF9ED]">
        <Link href="#" className="hover:underline underline-offset-2">
          {promoData.message}
        </Link>
      </div>
    )
  }

  return (
    <div className="h-10 w-full flex items-center justify-center bg-black text-[#FFF9ED]">
      {promoData.message}
    </div>
  )
}
