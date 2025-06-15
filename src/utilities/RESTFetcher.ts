// @ts-expect-error allow any
export async function RESTFetcher<T>(...args) {
	// @ts-expect-error allow any
	return fetch(...args).then((res) => res.json() as Promise<T>)
}
