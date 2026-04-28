export type PropertyImageVariantName = 'thumb' | 'card' | 'hero';

export type PropertyImageVariantConfig = {
	field: 'images_thumb_webp' | 'images_card_webp' | 'images_hero_webp' | 'images';
	width: number;
	height: number;
	quality: number;
};

export type OptimizedPropertyImage = {
	id: string;
	originalName: string;
	originalType: string;
	originalSize: number;
	previewUrl: string;
	thumbFile: File;
	cardFile: File;
	heroFile: File;
	metadata: {
		id: string;
		originalName: string;
		originalType: string;
		originalSize: number;
		generatedAt: string;
		variants: Record<
			PropertyImageVariantName,
			{
				fileName: string;
				width: number;
				height: number;
				bytes: number;
				format: 'image/webp';
				quality: number;
			}
		>;
	};
};

export const PROPERTY_IMAGE_VARIANTS = {
	thumb: {
		field: 'images_thumb_webp',
		width: 320,
		height: 240,
		quality: 0.78
	},
	card: {
		field: 'images_card_webp',
		width: 900,
		height: 675,
		quality: 0.82
	},
	hero: {
		field: 'images_hero_webp',
		width: 1800,
		height: 1200,
		quality: 0.84
	}
} satisfies Record<PropertyImageVariantName, PropertyImageVariantConfig>;

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
const OUTPUT_MIME = 'image/webp';

function sanitizeBaseName(name: string): string {
	const withoutExtension = name.replace(/\.[^.]+$/, '');
	const normalized = withoutExtension
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || 'property-image';
}

function readImage(file: File): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const objectUrl = URL.createObjectURL(file);
		const image = new Image();

		image.onload = () => {
			URL.revokeObjectURL(objectUrl);
			resolve(image);
		};

		image.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error(`Impossibile leggere l'immagine "${file.name}".`));
		};

		image.src = objectUrl;
	});
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					reject(new Error('Il browser non ha prodotto un file WebP valido.'));
					return;
				}

				resolve(blob);
			},
			OUTPUT_MIME,
			quality
		);
	});
}

async function renderVariant(
	image: HTMLImageElement,
	fileName: string,
	config: PropertyImageVariantConfig
) {
	const sourceWidth = image.naturalWidth;
	const sourceHeight = image.naturalHeight;
	const scale = Math.min(config.width / sourceWidth, config.height / sourceHeight, 1);
	const width = Math.max(1, Math.round(sourceWidth * scale));
	const height = Math.max(1, Math.round(sourceHeight * scale));
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d', { alpha: false });

	if (!context) {
		throw new Error('Il browser non supporta la conversione immagini via canvas.');
	}

	canvas.width = width;
	canvas.height = height;
	context.drawImage(image, 0, 0, width, height);

	const blob = await canvasToBlob(canvas, config.quality);
	const file = new File([blob], fileName, {
		type: OUTPUT_MIME,
		lastModified: Date.now()
	});

	return {
		file,
		metadata: {
			fileName,
			width,
			height,
			bytes: file.size,
			format: OUTPUT_MIME as 'image/webp',
			quality: config.quality
		}
	};
}

export async function optimizePropertyImage(
	file: File,
	index: number
): Promise<OptimizedPropertyImage> {
	if (!file.type.startsWith('image/')) {
		throw new Error(`"${file.name}" non e un'immagine valida.`);
	}

	if (file.size > MAX_UPLOAD_BYTES) {
		throw new Error(`"${file.name}" supera il limite di 20 MB.`);
	}

	const image = await readImage(file);
	const id = `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
	const baseName = `${sanitizeBaseName(file.name)}-${index + 1}`;
	const thumb = await renderVariant(image, `${baseName}-thumb.webp`, PROPERTY_IMAGE_VARIANTS.thumb);
	const card = await renderVariant(image, `${baseName}-card.webp`, PROPERTY_IMAGE_VARIANTS.card);
	const hero = await renderVariant(image, `${baseName}-hero.webp`, PROPERTY_IMAGE_VARIANTS.hero);

	return {
		id,
		originalName: file.name,
		originalType: file.type,
		originalSize: file.size,
		previewUrl: URL.createObjectURL(card.file),
		thumbFile: thumb.file,
		cardFile: card.file,
		heroFile: hero.file,
		metadata: {
			id,
			originalName: file.name,
			originalType: file.type,
			originalSize: file.size,
			generatedAt: new Date().toISOString(),
			variants: {
				thumb: thumb.metadata,
				card: card.metadata,
				hero: hero.metadata
			}
		}
	};
}

export async function optimizePropertyImages(files: File[]): Promise<OptimizedPropertyImage[]> {
	const optimized: OptimizedPropertyImage[] = [];

	for (const [index, file] of files.entries()) {
		optimized.push(await optimizePropertyImage(file, index));
	}

	return optimized;
}
