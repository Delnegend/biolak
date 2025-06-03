import React, { Fragment } from 'react'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionCenterBlock } from '@/blocks/CallToActionCenter/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import type { Page, Post, PostCategory, Product } from '@/payload-types'

import { ArchiveBlockConf } from './ArchiveBlock/config'
import { BannerBlock } from './Banner/Component'
import { BannerBlockConf } from './Banner/config'
import { BestSellerBlock } from './BestSeller/Component'
import { BestSellerBlockConf } from './BestSeller/config'
import { BuyNowBlock } from './BuyNow/Component'
import { BuyNowBlockConf } from './BuyNow/config'
import { CallToActionCenterBlockConf } from './CallToActionCenter/config'
import { CallToActionLeftBlock } from './CallToActionLeft/Component'
import { CallToActionLeftBlockConf } from './CallToActionLeft/config'
import { CallToActionPostBlock } from './CallToActionPost/Component'
import { CallToActionPostBlockConf } from './CallToActionPost/config'
import { CallToActionRightBlock } from './CallToActionRight/Component'
import { CallToActionRightBlockConf } from './CallToActionRight/config'
import { CallToAddToCartBlockComponent } from './CallToAddToCart/Component'
import { CallToAddToCartBlockConf } from './CallToAddToCart/config'
import { CertificatesBlock } from './Certificates/Component'
import { CertificatesBlockConf } from './Certificates/config'
import { ContentBlockConf } from './Content/config'
import { FocusLeftSmallImageBlock } from './FocusLeftSmallImage/Component'
import { FocusLeftSmallImageBlockConf } from './FocusLeftSmallImage/config'
import { FocusRightLargeImageBlock } from './FocusRightLargeImage/Component'
import { FocusRightLargeImageBlockConf } from './FocusRightLargeImage/config'
import { FocusRightSmallImageBlock } from './FocusRightSmallImage/Component'
import { FocusRightSmallImageBlockConf } from './FocusRightSmallImage/config'
import { FormBlockConf } from './Form/config'
import { HighlightCenterBlock } from './HighlightCenter/Component'
import { HighlightCenterBlockConf } from './HighlightCenter/config'
import { HighlightLeftBlock } from './HighlightLeft/Component'
import { HighlightLeftBlockConf } from './HighlightLeft/config'
import { HighlightRightBlock } from './HighlightRight/Component'
import { HighlighRightBlockConf as HighlightRightBlockConf } from './HighlightRight/config'
import { HowToUseProductBlockComponent } from './HowToUseProduct/Component'
import { HowToUseProductBlockConf } from './HowToUseProduct/config'
import { InfiniteScrollBlock } from './InfiniteScroll/Component'
import { InfiniteScrollBlockConf } from './InfiniteScroll/config'
import { LatestPostsBlock } from './LatestPosts/Component'
import { LatestPostsBlockConf } from './LatestPosts/config'
import { MediaBlockConf } from './MediaBlock/config'
import { PostsGridBlock } from './PostsGrid/Component'
import { PostsGridBlockConf } from './PostsGrid/config'
import { ProductsCarouselBlock } from './ProductsCarousel/Component'
import { ProductsCarouselBlockConf } from './ProductsCarousel/config'
import { ProductsCategoryBlock } from './ProductsCategory/Component'
import { ProductsCategoryBlockConf } from './ProductsCategory/config'
import { ThreePhotoBlock } from './ThreePhoto/Component'
import { ThreePhotoBlockConf } from './ThreePhoto/config'

const blockComponents = {
	[ArchiveBlockConf.slug]: () => ArchiveBlock,
	[BannerBlockConf.slug]: () => BannerBlock,
	[BestSellerBlockConf.slug]: () => BestSellerBlock,
	[BestSellerBlockConf.slug]: () => BestSellerBlock,
	[BuyNowBlockConf.slug]: (props: { product?: Product | null }) => BuyNowBlock(props),
	[CallToActionCenterBlockConf.slug]: () => CallToActionCenterBlock,
	[CallToActionLeftBlockConf.slug]: () => CallToActionLeftBlock,
	[CallToActionPostBlockConf.slug]: () => CallToActionPostBlock,
	[CallToActionRightBlockConf.slug]: () => CallToActionRightBlock,
	[CallToAddToCartBlockConf.slug]: (props: { product?: Product | null }) =>
		CallToAddToCartBlockComponent(props),
	[CertificatesBlockConf.slug]: () => CertificatesBlock,
	[ContentBlockConf.slug]: () => ContentBlock,
	[FocusLeftSmallImageBlockConf.slug]: () => FocusLeftSmallImageBlock,
	[FocusRightLargeImageBlockConf.slug]: () => FocusRightLargeImageBlock,
	[FocusRightSmallImageBlockConf.slug]: () => FocusRightSmallImageBlock,
	[FormBlockConf.slug]: () => FormBlock,
	[HighlightCenterBlockConf.slug]: () => HighlightCenterBlock,
	[HighlightLeftBlockConf.slug]: () => HighlightLeftBlock,
	[HighlightRightBlockConf.slug]: () => HighlightRightBlock,
	[HowToUseProductBlockConf.slug]: (props: { product?: Product | null }) =>
		HowToUseProductBlockComponent(props),
	[InfiniteScrollBlockConf.slug]: () => InfiniteScrollBlock,
	[LatestPostsBlockConf.slug]: () => LatestPostsBlock,
	[MediaBlockConf.slug]: () => MediaBlockComponent,
	[PostsGridBlockConf.slug]: () => PostsGridBlock,
	[ProductsCarouselBlockConf.slug]: () => ProductsCarouselBlock,
	[ProductsCategoryBlockConf.slug]: () => ProductsCategoryBlock,
	[ThreePhotoBlockConf.slug]: () => ThreePhotoBlock,
}

export function RenderBlocks({
	blocks,
	product,
	post,
	postCategory,
}: {
	blocks: Page['layout'][0][] | Post['layout'][0][] | Product['content']
	product?: Product | null
	post?: Post | null
	postCategory?: PostCategory | null
}): React.JSX.Element {
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

				const Block = blockComponents[blockType]?.({ product })
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
