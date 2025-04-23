import { CertificatesBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { DM_Sans } from 'next/font/google'
import Image from 'next/image'

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400'],
})

export function CertificatesBlock(props: CertificatesBlockProps): React.JSX.Element {
  return (
    <div className="flex w-full flex-col items-center justify-center border-t border-black py-16">
      <div className="mb-16 text-balance text-center font-serif text-5xl font-bold text-primary">
        {props.title}
      </div>
      <div className="grid w-5/6 max-w-7xl grid-cols-3 gap-6">
        {props.organizations?.map((org, index) => {
          const logo = org.logo && typeof org.logo === 'object' ? org.logo : undefined
          return (
            <div className="flex flex-col items-center gap-4 p-8" key={index}>
              <Image
                src={logo?.url ?? 'https://placehold.co/144x144'}
                width={logo?.width ?? 144}
                height={logo?.height ?? 144}
                alt={`${org.title} Logo`}
                className="aspect-square size-full max-h-36 max-w-36 object-contain"
                unoptimized={logo?.url === undefined || logo.mimeType === 'image/svg+xml'}
              />
              <div className="text-center font-serif text-5xl font-semibold leading-8 text-primary">
                {org.title}
              </div>
              <div
                className={cn(
                  dmsans.className,
                  'text-balance text-center text-xl leading-8 text-primary',
                )}
              >
                {org.description}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
