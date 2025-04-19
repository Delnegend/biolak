import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ThreePhoto } from './ThreePhoto/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  threePhoto: ThreePhoto,
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
          <div className="my-16" key={index}>
            {/* @ts-expect-error there may be some mismatch between the expected types here */}
            <Block {...block} disableInnerContainer />
          </div>
        )
      })}
    </Fragment>
  )
}
