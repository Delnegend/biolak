import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

import RichText from '@/components/RichText'
import { Lang } from '@/utilities/lang'

import { Width } from '../Width'

export function Message({
	message,
	__locale,
}: {
	message: SerializedEditorState
	__locale: Lang
}): React.JSX.Element {
	return (
		<Width className="my-12" width="100">
			{message && <RichText data={message} locale={__locale} />}
		</Width>
	)
}
