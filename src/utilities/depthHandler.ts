import { tryCatch } from './tryCatch'

/**
 * Pretty wrapper for handling referenced data from Payload.
 *
 * Learn more: [Why does Payload use numbers in relations?](https://payloadcms.com/community-help/discord/why-does-payload-generated-types-have-numbers-as-a-possibility-in-so-many-relations)
 */
export async function depthHandler<T extends object>({
	data,
	fetch,
}: {
	data?: T | number | null
	fetch: (id: number) => Promise<T>
}): ReturnType<typeof tryCatch<T | null>> {
	if (!data)
		return {
			data: null,
			ok: true,
			error: null,
		}

	if (typeof data === 'object')
		return {
			data,
			ok: true,
			error: null,
		}

	return tryCatch(async () => fetch(data))
}

export async function arrayDepthHandler<T extends object>({
	data,
	fetch,
}: {
	data?: (T | number)[] | null
	fetch: (ids: number[]) => Promise<T[]>
}): ReturnType<typeof tryCatch<T[]>> {
	if (!data) {
		return {
			data: [],
			ok: true,
			error: null,
		}
	}

	if (typeof data[0] === 'object') {
		return {
			data: data as T[],
			ok: true,
			error: null,
		}
	}

	return tryCatch(async () => fetch(data.filter((item) => typeof item === 'number')))
}
