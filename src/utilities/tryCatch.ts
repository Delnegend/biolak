type Result<T, E = unknown> =
	| {
			ok: false
			error: E
			data: null
	  }
	| {
			ok: true
			data: T
			error: null
	  }

export async function tryCatch<T, E = unknown>(fn: () => Promise<T>): Promise<Result<T, E>> {
	try {
		return { ok: true, data: await fn(), error: null }
	} catch (error) {
		return { ok: false, error: error as E, data: null }
	}
}

export function tryCatchSync<T, E = unknown>(fn: () => T): Result<T, E> {
	try {
		return { ok: true, data: fn(), error: null }
	} catch (error) {
		return { ok: false, error: error as E, data: null }
	}
}
