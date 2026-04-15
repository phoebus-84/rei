<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { X, Upload } from 'lucide-svelte';

	interface Props {
		property?: any;
		onsubmit: (formData: FormData) => Promise<void>;
		isLoading?: boolean;
	}

	let { property = null, onsubmit, isLoading = false }: Props = $props();

	let title = $state(property?.title ?? '');
	let slug = $state(property?.slug ?? '');
	let description = $state(property?.description ?? '');
	let price = $state<number>(property?.price ?? 0);
	let status = $state(property?.status ?? 'for_sale');
	let propertyType = $state(property?.property_type ?? 'apartment');
	let address = $state(property?.address ?? '');
	let city = $state(property?.city ?? '');
	let bedrooms = $state<number>(property?.bedrooms ?? 0);
	let bathrooms = $state<number>(property?.bathrooms ?? 0);
	let areaSqm = $state<number>(property?.area_sqm ?? 0);
	let featured = $state(property?.featured ?? false);

	// New detail fields
	let condoFees = $state<number>(property?.condo_fees ?? 0);
	let heatingType = $state(property?.heating_type ?? '');
	let rooms = $state<number>(property?.rooms ?? 0);
	let kitchens = $state<number>(property?.kitchens ?? 0);
	let balconies = $state<number>(property?.balconies ?? 0);
	let hasCellar = $state(property?.has_cellar ?? false);
	let hasGarage = $state(property?.has_garage ?? false);
	let garageSqm = $state<number>(property?.garage_sqm ?? 0);
	let landSqm = $state<number>(property?.land_sqm ?? 0);
	let hasParking = $state(property?.has_parking ?? false);
	let floor = $state<number>(property?.floor ?? 0);
	let totalFloors = $state<number>(property?.total_floors ?? 0);
	let hasElevator = $state(property?.has_elevator ?? false);
	let condition = $state(property?.condition ?? '');

	let amenities = $state(
		property?.amenities
			? Array.isArray(property.amenities)
				? property.amenities.join(', ')
				: ''
			: ''
	);

	let existingImages = $state<string[]>(property?.images ? [...property.images] : []);
	let removedImages = $state<string[]>([]);
	let newFiles = $state<File[]>([]);
	let newPreviews = $state<string[]>([]);
	let slugManual = $state(!!property);

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
		existingImages = existingImages.filter((f) => f !== filename);
		removedImages = [...removedImages, filename];
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files) return;
		const files = Array.from(input.files);
		newFiles = [...newFiles, ...files];
		for (const file of files) {
			newPreviews = [...newPreviews, URL.createObjectURL(file)];
		}
		input.value = '';
	}

	function removeNewFile(index: number) {
		URL.revokeObjectURL(newPreviews[index]);
		newFiles = newFiles.filter((_, i) => i !== index);
		newPreviews = newPreviews.filter((_, i) => i !== index);
	}

	function getImageUrl(filename: string): string {
		if (!property) return '';
		return pb.files.getUrl(property, filename, { thumb: '200x200' });
	}

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

		const amenitiesList = amenities
			.split(',')
			.map((s: string) => s.trim())
			.filter(Boolean);
		formData.append('amenities', JSON.stringify(amenitiesList));

		const authModel = pb.authStore.model as Record<string, any> | null;
		if (authModel?.id) {
			formData.append('agent', authModel.id);
		}

		if (property) {
			for (const filename of removedImages) {
				formData.append('images-', filename);
			}
			for (const file of newFiles) {
				formData.append('images+', file);
			}
		} else {
			for (const file of newFiles) {
				formData.append('images', file);
			}
		}

		await onsubmit(formData);
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
		<h2 class="mb-4 text-lg font-semibold">Immagini</h2>

		{#if existingImages.length > 0}
			<div class="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
				{#each existingImages as filename (filename)}
					<div class="group relative aspect-square overflow-hidden rounded-md border">
						<img src={getImageUrl(filename)} alt="" class="h-full w-full object-cover" />
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

		{#if newPreviews.length > 0}
			<div class="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
				{#each newPreviews as preview, i (preview)}
					<div
						class="group relative aspect-square overflow-hidden rounded-md border border-dashed border-primary"
					>
						<img src={preview} alt="" class="h-full w-full object-cover" />
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

		<label
			class="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-input px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
		>
			<Upload class="h-5 w-5" />
			<span>Carica immagini</span>
			<input
				type="file"
				accept="image/jpeg,image/png,image/gif,image/webp"
				multiple
				onchange={handleFileSelect}
				class="hidden"
			/>
		</label>
	</div>

	<!-- Actions -->
	<div class="flex items-center gap-3">
		<button
			type="submit"
			disabled={isLoading}
			class="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
		>
			{isLoading ? 'Salvataggio...' : property ? 'Aggiorna immobile' : 'Crea immobile'}
		</button>
		<a
			href="/admin/immobili"
			class="rounded-md border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
		>
			Annulla
		</a>
	</div>
</form>
