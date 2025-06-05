type FlatResult<T, E = unknown> =
	| (T & {
			tryCatchSuccess: true
	  })
	| {
			tryCatchSuccess: false
			error: E
	  }

export function tryCatch<T, E = unknown>(fn: () => Promise<T>): Promise<FlatResult<T, E>> {
	return fn().then(
		(data) => ({ ...data, tryCatchSuccess: true }) as FlatResult<T, E>,
		(error) => ({ tryCatchSuccess: false, error }) as FlatResult<T, E>,
	)
}

export function tryCatchSync<T, E = unknown>(fn: () => T): FlatResult<T, E> {
	try {
		return { tryCatchSuccess: true, ...fn() }
	} catch (error) {
		return { tryCatchSuccess: false, error: error as E }
	}
}
