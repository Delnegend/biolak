import React from 'react'

import { Code } from './Component.client'

export type CodeBlockProps = {
	code: string
	language?: string
	blockType: 'code'
}

type Props = CodeBlockProps & {
	className?: string
}

export function CodeBlock(props: Props): React.JSX.Element {
	return (
		<div className={[props.className, 'not-prose'].filter(Boolean).join(' ')}>
			<Code code={props.code} language={props.language} />
		</div>
	)
}
