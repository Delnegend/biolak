import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BestSellerBlockProps } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { cn } from '@/utilities/ui'
import { CirclePlus } from 'lucide-react'
import { Lato } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
})

export function BestSellerBlock(props: BestSellerBlockProps): React.JSX.Element {
  const products =
    props.products
      ?.map((p) => p !== null && p.product)
      .filter((p) => typeof p === 'object' && p !== null) || []

  return (
    <div className="flex h-[48rem]">
      <div className="flex h-full w-[40rem] flex-col justify-end gap-9 px-16 py-24">
        <div
          className={cn('font-serif text-7xl font-semibold italic leading-[3.5rem] text-primary')}
        >
          {props.title}
        </div>
        {props.description && <div className={cn('text-balance')}>{props.description}</div>}
      </div>

      <Carousel opts={{ dragFree: true }} className="py-24">
        <CarouselContent>
          {products.map((p) => {
            const img =
              p.gallery &&
              p.gallery.length > 0 &&
              typeof p.gallery[0]?.image === 'object' &&
              p.gallery[0]?.image !== null
                ? p.gallery[0]?.image
                : null
            return (
              <CarouselItem
                key={p.id}
                className="grid max-w-96 grid-cols-[1fr_auto] grid-rows-[auto]"
                style={{
                  gridTemplateAreas: `"img img"
                                      "title add-to-cart"
                                      "desc add-to-cart"
                                      "price add-to-cart"`,
                }}
              >
                <Image
                  src={img?.url ?? 'https://placehold.co/500x500'}
                  alt={`Ảnh sản phẩm ${p.title}`}
                  width={img?.width ?? 500}
                  height={img?.height ?? 500}
                  style={{ gridArea: 'img' }}
                  unoptimized={img === null}
                  className="mb-6 rounded-[0.5rem]"
                />
                <div style={{ gridArea: 'title' }} className="mb-2 text-lg font-bold">
                  {`${p.title} →`}
                </div>
                <div
                  style={{ gridArea: 'desc' }}
                  className={cn('mb-[1.375rem] text-xs uppercase', lato.className)}
                >
                  {p.shortDescription}
                </div>
                <div style={{ gridArea: 'price' }}>{formatPrice(p.price)}</div>
                <div style={{ gridArea: 'add-to-cart' }}>
                  <Button
                    hideArrow={true}
                    className="group flex size-12 items-center justify-center rounded-[0.5rem] border-[#E7B27E] bg-[#E7B27E] p-0 transition-all hover:border hover:bg-transparent"
                    title="Thêm vào giỏ hàng"
                  >
                    <CirclePlus className="w-full transition-colors group-hover:text-[#E7B27E]" />
                  </Button>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
