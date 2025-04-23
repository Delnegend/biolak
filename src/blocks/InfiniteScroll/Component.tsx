import { InfiniteScrollBlockProps } from '@/payload-types'
import { InfiniteScrollBlockCC } from './Component.client'
import { InfiniteScrollBlockConf } from './config'

export function InfiniteScrollBlock({
  graphic,
  animationDuration,
}: InfiniteScrollBlockProps): React.JSX.Element {
  if (typeof graphic === 'number') {
    return <></>
  }

  return <InfiniteScrollBlockCC graphic={graphic} animationDuration={animationDuration ?? 5} />
}
