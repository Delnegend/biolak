import React, { Fragment } from 'react'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionCenterBlock } from '@/blocks/CallToActionCenter/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import type { Page } from '@/payload-types'

import { ArchiveBlockConf } from './ArchiveBlock/config'
import { BestSellerBlock } from './BestSeller/Component'
import { BestSellerBlockConf } from './BestSeller/config'
import { BuyNowBlock } from './BuyNow/Component'
import { BuyNowBlockConf } from './BuyNow/config'
import { CallToActionCenterBlockConf } from './CallToActionCenter/config'
import { CallToActionLeftBlock } from './CallToActionLeft/Component'
import { CallToActionLeftBlockConf } from './CallToActionLeft/config'
import { CallToActionRightBlock } from './CallToActionRight/Component'
import { CallToActionRightBlockConf } from './CallToActionRight/config'
import { CallToAddToCartBlock } from './CallToAddToCart/Component'
import { CallToAddToCartBlockConf } from './CallToAddToCart/config'
import { CertificatesBlock } from './Certificates/Component'
import { CertificatesBlockConf } from './Certificates/config'
import { ContentBlockConf } from './Content/config'
import { FormBlockConf } from './Form/config'
import { HighlightCenterBlock } from './HighlightCenter/Component'
import { HighlightCenterBlockConf } from './HighlightCenter/config'
import { HighlightLeftBlock } from './HighlightLeft/Component'
import { HighlightLeftBlockConf } from './HighlightLeft/config'
import { HighlightRightBlock } from './HighlightRight/Component'
import { HighlighRightBlockConf as HighlightRightBlockConf } from './HighlightRight/config'
import { InfiniteScrollBlock } from './InfiniteScroll/Component'
import { InfiniteScrollBlockConf } from './InfiniteScroll/config'
import { LatestPostsBlock } from './LatestPosts/Component'
import { LatestPostsBlockConf } from './LatestPosts/config'
import { MediaBlockConf } from './MediaBlock/config'
import { ProductsCarouselBlock } from './ProductsCarousel/Component'
import { ProductsCarouselBlockConf } from './ProductsCarousel/config'
import { ThreePhotoBlock } from './ThreePhoto/Component'
import { ThreePhotoBlockConf } from './ThreePhoto/config'

const blockComponents = {
	[ArchiveBlockConf.slug]: ArchiveBlock,
	[BestSellerBlockConf.slug]: BestSellerBlock,
	[BuyNowBlockConf.slug]: BuyNowBlock,
	[CallToAddToCartBlockConf.slug]: CallToAddToCartBlock,
	[CallToActionCenterBlockConf.slug]: CallToActionCenterBlock,
	[CallToActionLeftBlockConf.slug]: CallToActionLeftBlock,
	[CallToActionRightBlockConf.slug]: CallToActionRightBlock,
	[CertificatesBlockConf.slug]: CertificatesBlock,
	[ContentBlockConf.slug]: ContentBlock,
	[FormBlockConf.slug]: FormBlock,
	[HighlightLeftBlockConf.slug]: HighlightLeftBlock,
	[HighlightRightBlockConf.slug]: HighlightRightBlock,
	[HighlightCenterBlockConf.slug]: HighlightCenterBlock,
	[BestSellerBlockConf.slug]: BestSellerBlock,
	[InfiniteScrollBlockConf.slug]: InfiniteScrollBlock,
	[LatestPostsBlockConf.slug]: LatestPostsBlock,
	[MediaBlockConf.slug]: MediaBlockComponent,
	[ProductsCarouselBlockConf.slug]: ProductsCarouselBlock,
	[ThreePhotoBlockConf.slug]: ThreePhotoBlock,
}

export function RenderBlocks({ blocks }: { blocks: Page['layout'][0][] }): React.JSX.Element {
	if (!(blocks && Array.isArray(blocks) && blocks.length > 0)) {
		return <></>
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
