/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint no-console: 0 */

export function cnsoleBuilder(where: string) {
	return {
		log(message: any, ...optionalParams: any[]): void {
			console.log(`[${where}]`, message, ...optionalParams)
		},
		error(message: any, ...optionalParams: any[]): void {
			console.error(`[${where} Error]`, message, ...optionalParams)
		},
		debug(message: any, ...optionalParams: any[]): void {
			if (process.env.NODE_ENV === 'development') {
				console.debug(`[${where} Debug]`, message, ...optionalParams)
			}
		},
		warn(message: any, ...optionalParams: any[]): void {
			console.warn(`[${where} Warn]`, message, ...optionalParams)
		},
		info(message: any, ...optionalParams: any[]): void {
			console.info(`[${where} Info]`, message, ...optionalParams)
		},
	}
}
