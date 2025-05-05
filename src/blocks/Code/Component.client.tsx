'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'

import { CopyButton } from './CopyButton'

type Props = {
	code: string
	language?: string
}

export function Code(props: Props): React.JSX.Element {
	if (!props.code) return <></>

	return (
		<Highlight code={props.code} language={props.language ?? ''} theme={themes.vsDark}>
			{({ getLineProps, getTokenProps, tokens }) => (
				<pre className="overflow-x-auto rounded border border-border bg-black p-4 text-xs">
					{tokens.map((line, i) => (
						<div key={i} {...getLineProps({ className: 'table-row', line })}>
							<span className="table-cell select-none text-right text-white/25">
								{i + 1}
							</span>
							<span className="table-cell pl-4">
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</span>
						</div>
					))}
					<CopyButton code={props.code} />
				</pre>
			)}
		</Highlight>
	)
}
