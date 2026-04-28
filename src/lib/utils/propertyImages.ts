import type { RecordModel } from 'pocketbase';
import { getImageUrl } from './imageUrl';

export type PropertyImageVariant = 'thumb' | 'card' | 'hero';

type PropertyRecord = RecordModel & {
	images?: string[];
	images_thumb_webp?: string[];
	images_card_webp?: string[];
	images_hero_webp?: string[];
	cover_image?: string;
	image_alt?: string;
	image_title?: string;
	image_caption?: string;
	title?: string;
	city?: string;
};

const variantFields = {
	thumb: 'images_thumb_webp',
	card: 'images_card_webp',
	hero: 'images_hero_webp'
} as const;

const legacyThumbSizes = {
	thumb: '320x240',
	card: '900x675',
	hero: '0x0'
} as const;

function asStringArray(value: unknown): string[] {
	return Array.isArray(value)
		? value.filter((item): item is string => typeof item === 'string')
		: [];
}

function getLegacyImages(property: PropertyRecord): string[] {
	return asStringArray(property.images);
}

function getVariantImages(property: PropertyRecord, variant: PropertyImageVariant): string[] {
	return asStringArray(property[variantFields[variant]]);
}

export function getOrderedPropertyImages(property: PropertyRecord): string[] {
	const images = getLegacyImages(property);

	if (!property.cover_image || !images.includes(property.cover_image)) {
		return images;
	}

	return [property.cover_image, ...images.filter((image) => image !== property.cover_image)];
}

export function getPropertyImageAlt(property: PropertyRecord, index = 0): string {
	const explicitAlt = property.image_alt?.trim();
	if (explicitAlt) return explicitAlt;

	const parts = [property.title, property.city].filter(Boolean);
	const label = parts.length > 0 ? parts.join(' - ') : 'Immobile REI';
	return index === 0 ? label : `${label}, foto ${index + 1}`;
}

export function getPropertyVariantFileName(
	property: PropertyRecord,
	variant: PropertyImageVariant,
	legacyFileName?: string
): string | undefined {
	const legacyImages = getLegacyImages(property);
	const fallbackIndex = property.cover_image ? legacyImages.indexOf(property.cover_image) : 0;
	const requestedIndex = legacyFileName ? legacyImages.indexOf(legacyFileName) : fallbackIndex;
	const index = requestedIndex >= 0 ? requestedIndex : 0;
	const variantImages = getVariantImages(property, variant);

	return variantImages[index] || legacyFileName || property.cover_image || legacyImages[index];
}

export function getPropertyVariantUrl(
	property: PropertyRecord,
	variant: PropertyImageVariant,
	legacyFileName?: string
): string {
	const fileName = getPropertyVariantFileName(property, variant, legacyFileName);
	if (!fileName) return '';

	const optimizedImages = getVariantImages(property, variant);
	const usesOptimizedVariant = optimizedImages.includes(fileName);
	const thumbSize = usesOptimizedVariant ? '0x0' : legacyThumbSizes[variant];

	return getImageUrl('pbc_properties_001', property.id, fileName, thumbSize);
}

export function getPropertyCoverUrl(
	property: PropertyRecord,
	variant: PropertyImageVariant
): string {
	return getPropertyVariantUrl(
		property,
		variant,
		property.cover_image || getLegacyImages(property)[0]
	);
}
