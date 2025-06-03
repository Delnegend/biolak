type Result<T, E = unknown> =
	| {
			success: true
			data: T
	  }
	| {
			success: false
			error: E
	  }

export function tryCatch<T, E = unknown>(fn: () => Promise<T>): Promise<Result<T, E>> {
	return fn().then(
		(data) => ({ success: true, data }),
		(error) => ({ success: false, error: error as E }),
	)
}
export function tryCatchSync<T, E = unknown>(fn: () => T): Result<T, E> {
	try {
		return { success: true, data: fn() }
	} catch (error) {
		return { success: false, error: error as E }
	}
}
