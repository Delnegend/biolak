import type { ThreePhotoBlockProps } from '@/payload-types'
import Image from 'next/image'

export const ThreePhotoBlock: React.FC<ThreePhotoBlockProps> = (props) => {
  const { photoLeft, photoCenter, photoRight } = props

  if (
    typeof photoLeft === 'number' ||
    typeof photoCenter === 'number' ||
    typeof photoRight === 'number' ||
    !photoLeft.url ||
    !photoCenter.url ||
    !photoRight.url
  ) {
    return <></>
  }

  return (
    <div className="mx-auto grid w-4/5 max-w-7xl grid-cols-[290fr_620fr_290fr] gap-x-10">
      <Image
        className="place-self-center"
        src={photoLeft.url}
        alt={photoLeft.alt ?? 'Left Photo'}
        width={photoLeft.width ?? 300}
        height={photoLeft.height ?? 300}
      />
      <Image
        className="place-self-center"
        src={photoCenter.url}
        alt={photoCenter.alt ?? 'Center Photo'}
        width={photoCenter.width ?? 300}
        height={photoCenter.height ?? 300}
      />
      <Image
        className="place-self-center"
        src={photoRight.url}
        alt={photoRight.alt ?? 'Right Photo'}
        width={photoRight.width ?? 300}
        height={photoRight.height ?? 300}
      />
    </div>
  )
}
