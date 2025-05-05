import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

import RichText from '@/components/RichText'

import { Width } from '../Width'

export function Message({ message }: { message: SerializedEditorState }): React.JSX.Element {
	return (
		<Width className="my-12" width="100">
			{message && <RichText data={message} />}
		</Width>
	)
}
