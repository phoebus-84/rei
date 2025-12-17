/**
 * Generate a PocketBase image URL
 * @param collectionId - The collection ID or name (e.g., 'properties')
 * @param recordId - The record ID
 * @param fileName - The file name
 * @param size - Thumbnail size (e.g., '300x300', '0x0' for original)
 * @returns The full image URL
 */
export function getImageUrl(
	collectionId: string,
	recordId: string,
	fileName: string,
	size: string = '0x0'
): string {
	const pbUrl = import.meta.env.VITE_PB_URL || 'http://localhost:8090';
	return `${pbUrl}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
}

/**
 * Get thumbnail URL for a property image
 * @param recordId - The property record ID
 * @param fileName - The image file name
 * @returns The thumbnail URL (300x300)
 */
export function getPropertyThumbnailUrl(recordId: string, fileName: string): string {
	return getImageUrl('properties', recordId, fileName, '300x300');
}

/**
 * Get full-size URL for a property image
 * @param recordId - The property record ID
 * @param fileName - The image file name
 * @returns The full-size image URL
 */
export function getPropertyImageUrl(recordId: string, fileName: string): string {
	return getImageUrl('properties', recordId, fileName, '0x0');
}

/**
 * Get avatar URL for a user
 * @param recordId - The user record ID
 * @param fileName - The avatar file name
 * @returns The avatar URL (150x150)
 */
export function getUserAvatarUrl(recordId: string, fileName: string): string {
	return getImageUrl('users', recordId, fileName, '150x150');
}
