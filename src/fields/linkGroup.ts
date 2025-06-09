import type { ArrayField, Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { Lang } from '@/utilities/lang'

import { link } from './link'

type LinkGroupType = (options?: { overrides?: Partial<ArrayField> }) => Field

export const linkGroup: LinkGroupType = ({ overrides = {} } = {}) => {
	const generatedLinkGroup: Field = {
		name: 'links',
		type: 'array',
		labels: {
			plural: {
				[Lang.English]: 'Links',
				[Lang.Vietnamese]: 'Liên kết',
			},
			singular: {
				[Lang.English]: 'Link',
				[Lang.Vietnamese]: 'Liên kết',
			},
		},
		fields: [link()],
		admin: {
			initCollapsed: true,
		},
	}

	return deepMerge(generatedLinkGroup, overrides)
}
