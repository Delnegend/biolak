import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

import { newLogger } from '@/utilities/logger'

const logger = newLogger('search/beforeSync')

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
	const {
		doc: { relationTo: collection },
	} = searchDoc

	const { slug, id, categories, title, meta } = originalDoc

	const modifiedDoc: DocToSync = {
		...searchDoc,
		slug,
		meta: {
			...meta,
			title: meta?.title || title,
			image: meta?.image?.id || meta?.image,
			description: meta?.description,
		},
		categories: [],
	}

	if (categories && Array.isArray(categories) && categories.length > 0) {
		// get full categories and keep a flattened copy of their most important properties
		try {
			const mappedCategories = categories.map((category) => {
				const { id, title } = category

				return {
					relationTo: 'categories',
					id,
					title,
				}
			})

			modifiedDoc.categories = mappedCategories
		} catch (err) {
			logger.error(
				`Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
				err,
			)
		}
	}

	return modifiedDoc
}
