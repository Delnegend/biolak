/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

import { importMap } from '../importMap'

type Args = {
	params: Promise<{
		segments: string[]
	}>
	searchParams: Promise<{
		[key: string]: string | string[]
	}>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
	generatePageMetadata({ config, params, searchParams })

export default function NotFound({ params, searchParams }: Args) {
	return NotFoundPage({ config, params, searchParams, importMap })
}
