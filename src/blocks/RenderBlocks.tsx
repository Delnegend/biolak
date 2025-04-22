import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { ArchiveBlockConf } from './ArchiveBlock/config'
import { CallToActionBlockConf } from './CallToAction/config'
import { CertificatesBlock } from './Certificates/Component'
import { CertificatesBlockConfig } from './Certificates/config'
import { ContentBlockConf } from './Content/config'
import { FormBlockConf } from './Form/config'
import { MediaBlockConf } from './MediaBlock/config'
import { ProductsCarouselBlock } from './ProductsCarousel/Component'
import { ProductsCarouselBlockConf } from './ProductsCarousel/config'
import { ThreePhotoBlock } from './ThreePhoto/Component'
import { ThreePhotoBlockConf } from './ThreePhoto/config'

const blockComponents = {
  [ArchiveBlockConf.slug]: ArchiveBlock,
  [ContentBlockConf.slug]: ContentBlock,
  [CallToActionBlockConf.slug]: CallToActionBlock,
  [FormBlockConf.slug]: FormBlock,
  [MediaBlockConf.slug]: MediaBlockComponent,
  [ThreePhotoBlockConf.slug]: ThreePhotoBlock,
  [ProductsCarouselBlockConf.slug]: ProductsCarouselBlock,
  [CertificatesBlockConfig.slug]: CertificatesBlock,
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
