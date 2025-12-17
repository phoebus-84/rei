/**
 * Format a price as EUR currency
 * @param price - The price in EUR
 * @param locale - The locale for formatting (default: 'en-IE' for EUR)
 * @returns Formatted price string (e.g., '€450,000')
 */
export function formatCurrency(price: number, locale: string = 'en-IE'): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price);
}

/**
 * Format area in square meters
 * @param area - Area in square meters
 * @returns Formatted area string (e.g., '250 m²')
 */
export function formatArea(area: number): string {
	return `${area.toLocaleString('en-IE')} m²`;
}

/**
 * Format a number with thousands separator
 * @param num - The number to format
 * @param locale - The locale for formatting
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-IE'): string {
	return num.toLocaleString(locale);
}
