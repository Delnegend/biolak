import React from 'react'

import type { CallToActionRightBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/utilities/ui'
import { Phudu } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const phudu = Phudu({ subsets: ['vietnamese'], weight: ['400', '600'] })

export function CallToActionRightBlock(props: CallToActionRightBlockProps): React.JSX.Element {
  return (
    <div className="safe-width flex h-[48rem] justify-between bg-background">
      <Carousel opts={{ dragFree: true }} className="place-self-center">
        <CarouselContent>
          {props.gallery?.map((item, idx) => {
            const image = item.image && typeof item.image === 'object' ? item.image : null
            return (
              <CarouselItem className="max-w-fit" key={item.id ?? `${idx}-${item.title}`}>
                <Image
                  src={image?.url ?? 'https://placehold.co/380x460'}
                  alt={`Ảnh sản phẩm ${item.title}`}
                  width={image?.width ?? 380}
                  height={image?.height ?? 460}
                  className="mb-4 h-[28.75rem] w-[23.75rem] rounded-[0.5rem] object-cover"
                  unoptimized={image === null}
                />
                <div className={cn('text-balance text-center text-2xl', phudu.className)}>
                  {item.title}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="box-content flex max-w-[28rem] flex-col gap-6 self-end py-16 pl-24">
        <div className="leading -mb-8 whitespace-pre-wrap font-serif text-7xl font-semibold italic leading-[5rem] text-primary">
          {props['sub-title']}
        </div>
        <div
          className={cn(
            'leading whitespace-pre-wrap font-serif text-7xl font-semibold leading-[5rem] text-primary',
            phudu.className,
          )}
        >
          {props.title}
        </div>
        {props.description && (
          <RichText
            data={props.description}
            enableGutter={false}
            className="text-balance text-xl leading-8 text-primary"
          />
        )}
        <Link
          href={props.button.link?.url ?? '#'}
          target={props.button.link?.newTab ? '_blank' : '_self'}
        >
          <Button className="w-full" variant="outline" size="lg">
            {props.button.text}
          </Button>
        </Link>
      </div>
    </div>
  )
}
