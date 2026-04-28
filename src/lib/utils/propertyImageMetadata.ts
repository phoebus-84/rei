import type { RecordModel } from 'pocketbase';
import type { OptimizedPropertyImage } from './propertyImageOptimization';

export type ImageSeoFields = {
	alt: string;
	title: string;
	caption: string;
};

export type PropertyImageSubmitOptions = {
	coverImage: string;
	coverUploadId: string;
	existingImageCountAfterRemoval: number;
	optimizedImages: OptimizedPropertyImage[];
	removedImages: string[];
	imageSeo: ImageSeoFields;
};

export type PropertyImageMetadataEntry = OptimizedPropertyImage['metadata'] & {
	sourceFileName?: string;
	thumbFileName?: string;
	cardFileName?: string;
	heroFileName?: string;
	alt?: string;
	title?: string;
	caption?: string;
};

type PropertyRecord = RecordModel & {
	images?: string[];
	images_thumb_webp?: string[];
	images_card_webp?: string[];
	images_hero_webp?: string[];
	image_metadata?: unknown;
};

function asStringArray(value: unknown): string[] {
	return Array.isArray(value)
		? value.filter((item): item is string => typeof item === 'string')
		: [];
}

export function readPropertyImageMetadata(value: unknown): PropertyImageMetadataEntry[] {
	return Array.isArray(value)
		? value.filter((item): item is PropertyImageMetadataEntry => !!item && typeof item === 'object')
		: [];
}

export function buildPropertyImageMetadata(options: {
	record: PropertyRecord;
	existingMetadata: unknown;
	removedSourceFileNames: string[];
	existingImageCountAfterRemoval: number;
	optimizedImages: OptimizedPropertyImage[];
	seo: ImageSeoFields;
}): PropertyImageMetadataEntry[] {
	const removed = new Set(options.removedSourceFileNames);
	const images = asStringArray(options.record.images);
	const thumbs = asStringArray(options.record.images_thumb_webp);
	const cards = asStringArray(options.record.images_card_webp);
	const heroes = asStringArray(options.record.images_hero_webp);
	const keptMetadata = readPropertyImageMetadata(options.existingMetadata).filter((entry) => {
		return !entry.sourceFileName || !removed.has(entry.sourceFileName);
	});

	const newMetadata = options.optimizedImages.map((image, index) => {
		const storedIndex = options.existingImageCountAfterRemoval + index;

		return {
			...image.metadata,
			sourceFileName: images[storedIndex],
			thumbFileName: thumbs[storedIndex],
			cardFileName: cards[storedIndex],
			heroFileName: heroes[storedIndex],
			alt: options.seo.alt,
			title: options.seo.title,
			caption: options.seo.caption
		};
	});

	return [...keptMetadata, ...newMetadata];
}

export function getSubmittedCoverImage(options: {
	record: PropertyRecord;
	coverImage: string;
	coverUploadId: string;
	existingImageCountAfterRemoval: number;
	optimizedImages: OptimizedPropertyImage[];
}): string {
	const images = asStringArray(options.record.images);

	if (options.coverUploadId) {
		const uploadIndex = options.optimizedImages.findIndex(
			(image) => image.id === options.coverUploadId
		);
		const storedIndex = options.existingImageCountAfterRemoval + uploadIndex;
		return images[storedIndex] || images[0] || '';
	}

	return options.coverImage || images[0] || '';
}
