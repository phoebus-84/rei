<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import {
		getPropertyVariantUrl,
		optimizePropertyImages,
		type ImageSeoFields,
		type OptimizedPropertyImage,
		type PropertyImageSubmitOptions
	} from '$lib/utils';
	import { onDestroy } from 'svelte';
	import { X, Upload, Star, Image as ImageIcon } from 'lucide-svelte';

	type PropertyFormRecord = RecordModel & {
		title?: string;
		slug?: string;
		description?: string;
		price?: number;
		status?: string;
		property_type?: string;
		address?: string;
		city?: string;
		bedrooms?: number;
		bathrooms?: number;
		area_sqm?: number;
		featured?: boolean;
		condo_fees?: number;
		heating_type?: string;
		rooms?: number;
		kitchens?: number;
		balconies?: number;
		has_cellar?: boolean;
		has_garage?: boolean;
		garage_sqm?: number;
		land_sqm?: number;
		has_parking?: boolean;
		floor?: number;
		total_floors?: number;
		has_elevator?: boolean;
		condition?: string;
		amenities?: unknown;
		cover_image?: string;
		images?: string[];
		images_thumb_webp?: string[];
		images_card_webp?: string[];
		images_hero_webp?: string[];
		image_alt?: string;
		image_title?: string;
		image_caption?: string;
	};

	interface Props {
		property?: PropertyFormRecord | null;
		onsubmit: (formData: FormData, options: PropertyImageSubmitOptions) => Promise<void>;
		isLoading?: boolean;
	}

	let { property = null, onsubmit, isLoading = false }: Props = $props();

	function getInitialProperty() {
		return property;
	}

	const initialProperty = getInitialProperty();

	let title = $state(initialProperty?.title ?? '');
	let slug = $state(initialProperty?.slug ?? '');
	let description = $state(initialProperty?.description ?? '');
	let price = $state<number>(initialProperty?.price ?? 0);
	let status = $state(initialProperty?.status ?? 'for_sale');
	let propertyType = $state(initialProperty?.property_type ?? 'apartment');
	let address = $state(initialProperty?.address ?? '');
	let city = $state(initialProperty?.city ?? '');
	let bedrooms = $state<number>(initialProperty?.bedrooms ?? 0);
	let bathrooms = $state<number>(initialProperty?.bathrooms ?? 0);
	let areaSqm = $state<number>(initialProperty?.area_sqm ?? 0);
	let featured = $state(initialProperty?.featured ?? false);

	// New detail fields
	let condoFees = $state<number>(initialProperty?.condo_fees ?? 0);
	let heatingType = $state(initialProperty?.heating_type ?? '');
	let rooms = $state<number>(initialProperty?.rooms ?? 0);
	let kitchens = $state<number>(initialProperty?.kitchens ?? 0);
	let balconies = $state<number>(initialProperty?.balconies ?? 0);
	let hasCellar = $state(initialProperty?.has_cellar ?? false);
	let hasGarage = $state(initialProperty?.has_garage ?? false);
	let garageSqm = $state<number>(initialProperty?.garage_sqm ?? 0);
	let landSqm = $state<number>(initialProperty?.land_sqm ?? 0);
	let hasParking = $state(initialProperty?.has_parking ?? false);
	let floor = $state<number>(initialProperty?.floor ?? 0);
	let totalFloors = $state<number>(initialProperty?.total_floors ?? 0);
	let hasElevator = $state(initialProperty?.has_elevator ?? false);
	let condition = $state(initialProperty?.condition ?? '');

	let amenities = $state(
		initialProperty?.amenities
			? Array.isArray(initialProperty.amenities)
				? initialProperty.amenities.join(', ')
				: ''
			: ''
	);

	let coverImage = $state(initialProperty?.cover_image ?? '');
	let existingImages = $state<string[]>(initialProperty?.images ? [...initialProperty.images] : []);
	let existingThumbImages = $state<string[]>(initialProperty?.images_thumb_webp ? [...initialProperty.images_thumb_webp] : []);
	let existingCardImages = $state<string[]>(initialProperty?.images_card_webp ? [...initialProperty.images_card_webp] : []);
	let existingHeroImages = $state<string[]>(initialProperty?.images_hero_webp ? [...initialProperty.images_hero_webp] : []);
	let removedImages = $state<string[]>([]);
	let removedThumbImages = $state<string[]>([]);
	let removedCardImages = $state<string[]>([]);
	let removedHeroImages = $state<string[]>([]);
	let newUploads = $state<OptimizedPropertyImage[]>([]);
	let imageAlt = $state(initialProperty?.image_alt ?? '');
	let imageTitle = $state(initialProperty?.image_title ?? '');
	let imageCaption = $state(initialProperty?.image_caption ?? '');
	let imageError = $state('');
	let isOptimizing = $state(false);
	let slugManual = $state(!!initialProperty);

	const inputClass =
		'mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring';

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}

	function onTitleInput() {
		if (!slugManual) {
			slug = slugify(title);
		}
	}

	function onSlugInput() {
		slugManual = true;
	}

	function removeExistingImage(filename: string) {
		const index = existingImages.indexOf(filename);
		const thumbFilename = index >= 0 ? existingThumbImages[index] : '';
		const cardFilename = index >= 0 ? existingCardImages[index] : '';
		const heroFilename = index >= 0 ? existingHeroImages[index] : '';

		existingImages = existingImages.filter((f) => f !== filename);
		existingThumbImages = existingThumbImages.filter((_, i) => i !== index);
		existingCardImages = existingCardImages.filter((_, i) => i !== index);
		existingHeroImages = existingHeroImages.filter((_, i) => i !== index);
		removedImages = [...removedImages, filename];
		if (thumbFilename) removedThumbImages = [...removedThumbImages, thumbFilename];
		if (cardFilename) removedCardImages = [...removedCardImages, cardFilename];
		if (heroFilename) removedHeroImages = [...removedHeroImages, heroFilename];
		if (coverImage === filename) coverImage = '';
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files) return;
		const files = Array.from(input.files);

		imageError = '';
		isOptimizing = true;

		try {
			const optimized = await optimizePropertyImages(files);
			newUploads = [...newUploads, ...optimized];

			if (!coverImage && optimized[0]) {
				coverImage = `upload:${optimized[0].id}`;
			}
		} catch (err: unknown) {
			imageError = err instanceof Error ? err.message : 'Errore durante la conversione delle immagini.';
		} finally {
			isOptimizing = false;
			input.value = '';
		}
	}

	function removeNewFile(index: number) {
		const upload = newUploads[index];
		if (upload) URL.revokeObjectURL(upload.previewUrl);
		newUploads = newUploads.filter((_, i) => i !== index);

		if (upload && coverImage === `upload:${upload.id}`) {
			coverImage = existingImages[0] || (newUploads[0] ? `upload:${newUploads[0].id}` : '');
		}
	}

	function getImageUrl(filename: string): string {
		if (!property) return '';
		return getPropertyVariantUrl(property, 'thumb', filename) || pb.files.getUrl(property, filename, { thumb: '200x200' });
	}

	function getImageSeo(): ImageSeoFields {
		const fallbackTitle = title || 'Immobile REI';
		const fallbackAlt = [fallbackTitle, city].filter(Boolean).join(' - ');

		return {
			alt: imageAlt.trim() || fallbackAlt,
			title: imageTitle.trim() || fallbackTitle,
			caption: imageCaption.trim()
		};
	}

	onDestroy(() => {
		for (const upload of newUploads) {
			URL.revokeObjectURL(upload.previewUrl);
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('slug', slug);
		formData.append('description', description);
		formData.append('price', String(price));
		formData.append('status', status);
		formData.append('property_type', propertyType);
		formData.append('address', address);
		formData.append('city', city);
		formData.append('bedrooms', String(bedrooms));
		formData.append('bathrooms', String(bathrooms));
		formData.append('area_sqm', String(areaSqm));
		formData.append('featured', String(featured));

		// New detail fields
		formData.append('condo_fees', String(condoFees));
		formData.append('heating_type', heatingType);
		formData.append('rooms', String(rooms));
		formData.append('kitchens', String(kitchens));
		formData.append('balconies', String(balconies));
		formData.append('has_cellar', String(hasCellar));
		formData.append('has_garage', String(hasGarage));
		formData.append('garage_sqm', String(garageSqm));
		formData.append('land_sqm', String(landSqm));
		formData.append('has_parking', String(hasParking));
		formData.append('floor', String(floor));
		formData.append('total_floors', String(totalFloors));
		formData.append('has_elevator', String(hasElevator));
		formData.append('condition', condition);

		const imageSeo = getImageSeo();
		const coverUploadId = coverImage.startsWith('upload:') ? coverImage.replace('upload:', '') : '';
		formData.append('cover_image', coverUploadId ? '' : coverImage);
		formData.append('image_alt', imageSeo.alt);
		formData.append('image_title', imageSeo.title);
		formData.append('image_caption', imageSeo.caption);

		const amenitiesList = amenities
			.split(',')
			.map((s: string) => s.trim())
			.filter(Boolean);
		formData.append('amenities', JSON.stringify(amenitiesList));

		const authModel = pb.authStore.model as Record<string, unknown> | null;
		if (typeof authModel?.id === 'string') {
			formData.append('agent', authModel.id);
		}

		if (property) {
			for (const filename of removedImages) {
				formData.append('images-', filename);
			}
			for (const filename of removedThumbImages) {
				formData.append('images_thumb_webp-', filename);
			}
			for (const filename of removedCardImages) {
				formData.append('images_card_webp-', filename);
			}
			for (const filename of removedHeroImages) {
				formData.append('images_hero_webp-', filename);
			}
			for (const upload of newUploads) {
				formData.append('images+', upload.heroFile);
				formData.append('images_thumb_webp+', upload.thumbFile);
				formData.append('images_card_webp+', upload.cardFile);
				formData.append('images_hero_webp+', upload.heroFile);
			}
		} else {
			for (const upload of newUploads) {
				formData.append('images', upload.heroFile);
				formData.append('images_thumb_webp', upload.thumbFile);
				formData.append('images_card_webp', upload.cardFile);
				formData.append('images_hero_webp', upload.heroFile);
			}
		}

		await onsubmit(formData, {
			coverImage: coverUploadId ? '' : coverImage,
			coverUploadId,
			existingImageCountAfterRemoval: existingImages.length,
			optimizedImages: newUploads,
			removedImages,
			imageSeo
		});
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<!-- Basic info -->
	<div class="rounded-lg border bg-background p-6">
		<h2 class="mb-4 text-lg font-semibold">Informazioni base</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="title" class="block text-sm font-medium">Titolo *</label>
				<input
					id="title"
					type="text"
					bind:value={title}
					oninput={onTitleInput}
					required
					class={inputClass}
				/>
			</div>

			<div class="sm:col-span-2">
				<label for="slug" class="block text-sm font-medium">Slug *</label>
				<input
					id="slug"
					type="text"
					bind:value={slug}
					oninput={onSlugInput}
					required
					class="{inputClass} font-mono"
				/>
			</div>

			<div class="sm:col-span-2">
				<label for="description" class="block text-sm font-medium">Descrizione</label>
				<textarea
					id="description"
					bind:value={description}
					rows="5"
					class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
				></textarea>
			</div>

			<div>
				<label for="price" class="block text-sm font-medium">Prezzo (€) *</label>
				<input
					id="price"
					type="number"
					bind:value={price}
					required
					min="0"
					class={inputClass}
				/>
			</div>

			<div>
				<label for="condo_fees" class="block text-sm font-medium">Spese condominiali (€/mese)</label>
				<input
					id="condo_fees"
					type="number"
					bind:value={condoFees}
					min="0"
					step="0.01"
					class={inputClass}
				/>
			</div>

			<div>
				<label for="status" class="block text-sm font-medium">Stato</label>
				<select id="status" bind:value={status} class={inputClass}>
					<option value="for_sale">In vendita</option>
					<option value="for_rent">In affitto</option>
					<option value="sold">Venduto</option>
					<option value="rented">Affittato</option>
				</select>
			</div>

			<div>
				<label for="property_type" class="block text-sm font-medium">Tipo immobile</label>
				<select id="property_type" bind:value={propertyType} class={inputClass}>
					<option value="house">Casa</option>
					<option value="apartment">Appartamento</option>
					<option value="commercial">Commerciale</option>
					<option value="land">Terreno</option>
				</select>
			</div>

			<div class="flex items-end">
				<label for="featured" class="flex items-center gap-2 pb-2 text-sm font-medium">
					<input
						id="featured"
						type="checkbox"
						bind:checked={featured}
						class="h-4 w-4 rounded border-input text-primary focus:ring-ring"
					/>
					In evidenza
				</label>
			</div>
		</div>
	</div>

	<!-- Location -->
	<div class="rounded-lg border bg-background p-6">
		<h2 class="mb-4 text-lg font-semibold">Posizione</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="address" class="block text-sm font-medium">Indirizzo *</label>
				<input id="address" type="text" bind:value={address} required class={inputClass} />
			</div>
			<div>
				<label for="city" class="block text-sm font-medium">Città *</label>
				<input id="city" type="text" bind:value={city} required class={inputClass} />
			</div>
		</div>
	</div>

	<!-- Details -->
	<div class="rounded-lg border bg-background p-6">
		<h2 class="mb-4 text-lg font-semibold">Composizione</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<label for="rooms" class="block text-sm font-medium">Locali</label>
				<input id="rooms" type="number" bind:value={rooms} min="0" class={inputClass} />
			</div>
			<div>
				<label for="bedrooms" class="block text-sm font-medium">Camere</label>
				<input
					id="bedrooms"
					type="number"
					bind:value={bedrooms}
					min="0"
					class={inputClass}
				/>
			</div>
			<div>
				<label for="kitchens" class="block text-sm font-medium">Cucine</label>
				<input id="kitchens" type="number" bind:value={kitchens} min="0" class={inputClass} />
			</div>
			<div>
				<label for="bathrooms" class="block text-sm font-medium">Bagni</label>
				<input
					id="bathrooms"
					type="number"
					bind:value={bathrooms}
					min="0"
					class={inputClass}
				/>
			</div>
			<div>
				<label for="balconies" class="block text-sm font-medium">Balconi</label>
				<input id="balconies" type="number" bind:value={balconies} min="0" class={inputClass} />
			</div>
			<div>
				<label for="area_sqm" class="block text-sm font-medium">Superficie (m²)</label>
				<input
					id="area_sqm"
					type="number"
					bind:value={areaSqm}
					min="0"
					class={inputClass}
				/>
			</div>
		</div>
		<div class="mt-4">
			<label for="amenities" class="block text-sm font-medium"
				>Servizi (separati da virgola)</label
			>
			<input
				id="amenities"
				type="text"
				bind:value={amenities}
				placeholder="es. Parcheggio, Giardino, Balcone"
				class={inputClass}
			/>
		</div>
	</div>

	<!-- Building -->
	<div class="rounded-lg border bg-background p-6">
		<h2 class="mb-4 text-lg font-semibold">Edificio</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<label for="floor" class="block text-sm font-medium">Piano</label>
				<input id="floor" type="number" bind:value={floor} min="0" class={inputClass} />
			</div>
			<div>
				<label for="total_floors" class="block text-sm font-medium">Piani totali</label>
				<input id="total_floors" type="number" bind:value={totalFloors} min="0" class={inputClass} />
			</div>
			<div class="flex items-end">
				<label for="has_elevator" class="flex items-center gap-2 pb-2 text-sm font-medium">
					<input
						id="has_elevator"
						type="checkbox"
						bind:checked={hasElevator}
						class="h-4 w-4 rounded border-input text-primary focus:ring-ring"
					/>
					Ascensore
				</label>
			</div>
			<div>
				<label for="condition" class="block text-sm font-medium">Stato immobile</label>
				<select id="condition" bind:value={condition} class={inputClass}>
					<option value="">— Seleziona —</option>
					<option value="nuovo">Nuovo</option>
					<option value="ristrutturato">Ristrutturato</option>
					<option value="abitabile">Abitabile</option>
					<option value="da_ristrutturare">Da ristrutturare</option>
				</select>
			</div>
			<div>
				<label for="heating_type" class="block text-sm font-medium">Riscaldamento</label>
				<select id="heating_type" bind:value={heatingType} class={inputClass}>
					<option value="">— Seleziona —</option>
					<option value="autonomo">Autonomo</option>
					<option value="centralizzato">Centralizzato</option>
					<option value="a_pavimento">A pavimento</option>
					<option value="assente">Assente</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Extras -->
	<div class="rounded-lg border bg-background p-6">
		<h2 class="mb-4 text-lg font-semibold">Dotazioni</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="flex items-end">
				<label for="has_cellar" class="flex items-center gap-2 pb-2 text-sm font-medium">
					<input
						id="has_cellar"
						type="checkbox"
						bind:checked={hasCellar}
						class="h-4 w-4 rounded border-input text-primary focus:ring-ring"
					/>
					Cantina
				</label>
			</div>
			<div class="flex items-end">
				<label for="has_parking" class="flex items-center gap-2 pb-2 text-sm font-medium">
					<input
						id="has_parking"
						type="checkbox"
						bind:checked={hasParking}
						class="h-4 w-4 rounded border-input text-primary focus:ring-ring"
					/>
					Parcheggio
				</label>
			</div>
			<div class="flex items-end">
				<label for="has_garage" class="flex items-center gap-2 pb-2 text-sm font-medium">
					<input
						id="has_garage"
						type="checkbox"
						bind:checked={hasGarage}
						class="h-4 w-4 rounded border-input text-primary focus:ring-ring"
					/>
					Box / Garage
				</label>
			</div>
			{#if hasGarage}
				<div>
					<label for="garage_sqm" class="block text-sm font-medium">Superficie box (m²)</label>
					<input id="garage_sqm" type="number" bind:value={garageSqm} min="0" class={inputClass} />
				</div>
			{/if}
			<div>
				<label for="land_sqm" class="block text-sm font-medium">Terreno (m²)</label>
				<input id="land_sqm" type="number" bind:value={landSqm} min="0" class={inputClass} />
			</div>
		</div>
	</div>

	<!-- Images -->
	<div class="rounded-lg border bg-background p-6">
		<div class="mb-4 flex items-center gap-2">
			<ImageIcon class="h-5 w-5 text-primary" />
			<h2 class="text-lg font-semibold">Immagini</h2>
		</div>

		<p class="mb-3 text-sm text-muted-foreground">Le immagini vengono convertite in WebP e salvate nei formati miniatura, card e hero. Clicca la stella per scegliere la copertina.</p>

		{#if imageError}
			<div class="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
				{imageError}
			</div>
		{/if}

		{#if existingImages.length > 0}
			<div class="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
				{#each existingImages as filename (filename)}
					<div class="group relative aspect-square overflow-hidden rounded-md border {coverImage === filename ? 'ring-2 ring-primary' : ''}">
						<img src={getImageUrl(filename)} alt="" class="h-full w-full object-cover" />
						<button
							type="button"
							onclick={() => (coverImage = coverImage === filename ? '' : filename)}
							class="absolute left-1 top-1 rounded-full p-1 transition-opacity {coverImage === filename ? 'bg-primary text-primary-foreground opacity-100' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'}"
							title="Imposta come copertina"
						>
							<Star class="h-3 w-3 {coverImage === filename ? 'fill-current' : ''}" />
						</button>
						<button
							type="button"
							onclick={() => removeExistingImage(filename)}
							class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
						>
							<X class="h-3 w-3" />
						</button>
					</div>
				{/each}
			</div>
		{/if}

		{#if newUploads.length > 0}
			<div class="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
				{#each newUploads as upload, i (upload.id)}
					<div
						class="group relative aspect-square overflow-hidden rounded-md border border-dashed border-primary {coverImage === `upload:${upload.id}` ? 'ring-2 ring-primary' : ''}"
					>
						<img src={upload.previewUrl} alt="" class="h-full w-full object-cover" />
						<button
							type="button"
							onclick={() => (coverImage = coverImage === `upload:${upload.id}` ? '' : `upload:${upload.id}`)}
							class="absolute left-1 top-1 rounded-full p-1 transition-opacity {coverImage === `upload:${upload.id}` ? 'bg-primary text-primary-foreground opacity-100' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'}"
							title="Imposta come copertina"
						>
							<Star class="h-3 w-3 {coverImage === `upload:${upload.id}` ? 'fill-current' : ''}" />
						</button>
						<button
							type="button"
							onclick={() => removeNewFile(i)}
							class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
						>
							<X class="h-3 w-3" />
						</button>
					</div>
				{/each}
			</div>
		{/if}

		{#if isOptimizing}
			<div class="mb-4 flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
				Conversione WebP in corso...
			</div>
		{/if}

		<label
			class="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-input px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
		>
			<Upload class="h-5 w-5" />
			<span>{isOptimizing ? 'Conversione...' : 'Carica immagini'}</span>
			<input
				type="file"
				accept="image/jpeg,image/png,image/gif,image/webp"
				multiple
				onchange={handleFileSelect}
				disabled={isOptimizing}
				class="hidden"
			/>
		</label>

		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="image_alt" class="block text-sm font-medium">Testo alternativo immagine</label>
				<input
					id="image_alt"
					type="text"
					bind:value={imageAlt}
					maxlength="160"
					placeholder="Es. Appartamento luminoso a Ivrea"
					class={inputClass}
				/>
			</div>
			<div>
				<label for="image_title" class="block text-sm font-medium">Titolo immagine</label>
				<input
					id="image_title"
					type="text"
					bind:value={imageTitle}
					maxlength="120"
					placeholder={title || 'Titolo immobile'}
					class={inputClass}
				/>
			</div>
			<div>
				<label for="image_caption" class="block text-sm font-medium">Didascalia</label>
				<input
					id="image_caption"
					type="text"
					bind:value={imageCaption}
					maxlength="220"
					placeholder="Dettaglio utile per SEO e condivisioni"
					class={inputClass}
				/>
			</div>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex items-center gap-3">
		<button
			type="submit"
			disabled={isLoading || isOptimizing}
			class="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
		>
			{isOptimizing ? 'Conversione immagini...' : isLoading ? 'Salvataggio...' : property ? 'Aggiorna immobile' : 'Crea immobile'}
		</button>
		<a
			href="/admin/immobili"
			class="rounded-md border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
		>
			Annulla
		</a>
	</div>
</form>
