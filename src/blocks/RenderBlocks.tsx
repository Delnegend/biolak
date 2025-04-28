import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionCenterBlock } from '@/blocks/CallToActionCenter/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { ArchiveBlockConf } from './ArchiveBlock/config'
import { BestSellerBlock } from './BestSeller/Component'
import { BestSellerBlockConf } from './BestSeller/config'
import { CallToActionCenterBlockConf } from './CallToActionCenter/config'
import { CallToActionLeftBlock } from './CallToActionLeft/Component'
import { CallToActionLeftBlockConf } from './CallToActionLeft/config'
import { CertificatesBlock } from './Certificates/Component'
import { CertificatesBlockConfig } from './Certificates/config'
import { ContentBlockConf } from './Content/config'
import { FormBlockConf } from './Form/config'
import { InfiniteScrollBlock } from './InfiniteScroll/Component'
import { InfiniteScrollBlockConf } from './InfiniteScroll/config'
import { MediaBlockConf } from './MediaBlock/config'
import { ProductsCarouselBlock } from './ProductsCarousel/Component'
import { ProductsCarouselBlockConf } from './ProductsCarousel/config'
import { ThreePhotoBlock } from './ThreePhoto/Component'
import { ThreePhotoBlockConf } from './ThreePhoto/config'
import { CallToActionRightBlockConf } from './CallToActionRight/config'
import { CallToActionRightBlock } from './CallToActionRight/Component'

const blockComponents = {
  [ArchiveBlockConf.slug]: ArchiveBlock,
  [BestSellerBlockConf.slug]: BestSellerBlock,
  [CallToActionCenterBlockConf.slug]: CallToActionCenterBlock,
  [CallToActionLeftBlockConf.slug]: CallToActionLeftBlock,
  [CallToActionRightBlockConf.slug]: CallToActionRightBlock,
  [CertificatesBlockConfig.slug]: CertificatesBlock,
  [ContentBlockConf.slug]: ContentBlock,
  [FormBlockConf.slug]: FormBlock,
  [InfiniteScrollBlockConf.slug]: InfiniteScrollBlock,
  [MediaBlockConf.slug]: MediaBlockComponent,
  [ProductsCarouselBlockConf.slug]: ProductsCarouselBlock,
  [ThreePhotoBlockConf.slug]: ThreePhotoBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  if (!(blocks && Array.isArray(blocks) && blocks.length > 0)) {
    return null
  }

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        if (!(blockType && blockType in blockComponents)) {
          return null
        }

        const Block = blockComponents[blockType]
        if (!Block) {
          return null
        }

        return (
          // @ts-expect-error there may be some mismatch between the expected types here
          <Block {...block} key={index} disableInnerContainer />
        )
      })}
    </Fragment>
  )
}
