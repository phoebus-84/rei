// Export all utility functions
export {
	getImageUrl,
	getPropertyThumbnailUrl,
	getPropertyImageUrl,
	getUserAvatarUrl
} from './imageUrl';
export { formatCurrency, formatArea, formatNumber } from './currency';

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to slugify
 * @returns The slugified text
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/[\s_-]+/g, '-') // Replace spaces, underscores, hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Format a date in a readable way
 * @param date - The date to format
 * @param locale - The locale for formatting
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = 'en-IE'): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(d);
}
