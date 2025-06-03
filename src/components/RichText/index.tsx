import {
	DefaultNodeTypes,
	type DefaultTypedEditorState,
	SerializedBlockNode,
	SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
	JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionCenterBlock } from '@/blocks/CallToActionCenter/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import type {
	BannerBlockProps,
	CallToActionCenterBlockProps,
	MediaBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<
			CallToActionCenterBlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps
	  >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	if (linkNode.fields.doc === undefined || linkNode.fields.doc === null) {
		throw new Error('Expected linkNode.fields.doc to be defined')
	}
	const { value, relationTo } = linkNode.fields.doc
	if (typeof value !== 'object') {
		throw new Error('Expected value to be an object')
	}
	const slug = value.slug
	return relationTo === 'posts' ? `/post/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	blocks: {
		banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
		mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
			<MediaBlockComponent
				className="col-span-3 col-start-1"
				imgClassName="m-0"
				{...node.fields}
				captionClassName="mx-auto max-w-[48rem]"
				enableGutter={false}
				disableInnerContainer={true}
			/>
		),
		code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
		cta: ({ node }: { node: SerializedBlockNode<CallToActionCenterBlockProps> }) => (
			<CallToActionCenterBlock {...node.fields} />
		),
	},
})

export default function RichText(
	props: {
		data: DefaultTypedEditorState
		enableGutter?: boolean
		enableProse?: boolean
	} & React.HTMLAttributes<HTMLDivElement>,
) {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return (
		<ConvertRichText
			converters={jsxConverters}
			className={cn(
				'payload-richtext',
				{
					container: enableGutter,
					'max-w-none': !enableGutter,
					'prose mx-auto md:prose-md dark:prose-invert': enableProse,
				},
				className,
			)}
			{...rest}
		/>
	)
}
