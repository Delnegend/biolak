import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { ProductsCarouselProps } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ProductsCarouselNavButton } from './ProductsCarouselNavButton'

export const ProductsCarousel: React.FC<ProductsCarouselProps> = (props) => {
  const products = props.products
    ? props.products.map((p) => p.product).filter((p) => typeof p === 'object')
    : undefined

  return (
    <div className="max-h-[55rem] overflow-hidden relative">
      {products && products.length > 0 && (
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {products.map((p) => {
              const img =
                p.gallery && p.gallery[0] && typeof p.gallery[0].image === 'object'
                  ? p.gallery[0].image
                  : undefined
              return (
                <CarouselItem key={p.id} className="grid grid-cols-2">
                  <Image
                    src={img?.url ?? 'https://placehold.co/720x880'}
                    alt={img?.alt ?? 'Product Image'}
                    width={img?.width ?? 720}
                    height={img?.height ?? 880}
                    className="object-cover size-full max-h-[55rem]"
                    unoptimized={img?.url === undefined}
                  />
                  <div className="flex flex-col gap-3 text-[#F1DAAE] bg-[#210E0A] text-balance px-14 justify-center">
                    <div className="font-medium text-xl">Sản phẩm bán chạy</div>
                    <div className="font-serif text-7xl font-bold">{p.title}</div>
                    <div className="my-5">{p.longDescription ?? p.shortDescription}</div>
                    <Link href="/[slug]" as={`/products/${p.id}`}>
                      <Button size="lg" className="w-[26rem]">
                        XEM THÊM
                      </Button>
                    </Link>
                    <div className="flex flex-row gap-3 mt-3">
                      {products.map((pDot, index) => (
                        <svg
                          key={`${pDot.id}-${index}`}
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            opacity={pDot.id === p.id ? '0.8' : '0.4'}
                            cx="5"
                            cy="5.16602"
                            r="5"
                            fill="white"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <ProductsCarouselNavButton direction="previous" className="absolute top-1/2 left-0" />
          <ProductsCarouselNavButton direction="next" className="absolute top-1/2 right-0" />
        </Carousel>
      )}
    </div>
  )
}
