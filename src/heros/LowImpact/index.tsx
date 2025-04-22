import type { Page } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { ArrowDown } from 'lucide-react'

interface ValidMedia {
  url: string
  width: number
  height: number
  alt: string
}

export const LowImpactHero: React.FC<Page['hero']> = (props) => {
  const { richText, media: media_ } = props

  let media: ValidMedia | undefined
  if (
    media_ !== undefined &&
    typeof media_ === 'object' &&
    media_ !== null &&
    media_.url &&
    media_.width &&
    media_.height
  ) {
    media = {
      url: media_.url,
      width: media_.width,
      height: media_.height,
      alt: media_.alt ?? '',
    }
  }

  return (
    <div className="container my-16 flex h-[22.5rem] flex-col items-center justify-center gap-11">
      {media && <Image src={media.url} alt={media.alt} width={media.width} height={media.height} />}
      <div className="max-w-3xl text-center">
        {richText && <RichText data={richText} enableGutter={false} />}
      </div>
      <ArrowDown color="#485A1E" size={30} />
    </div>
  )
}
