export const formatPrice = (price: number): string =>
	price.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
