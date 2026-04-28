<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/stores/auth';
	import { getPropertyThumbnailUrl, formatCurrency, formatArea } from '$lib/utils';
	import { Heart, MapPin, Bed, Bath, Square, DoorOpen, ArrowUpDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { RecordModel } from 'pocketbase';
	import { pb } from '$lib/pocketbase';

	export let property: RecordModel;

	const GUEST_SAVED_PROPERTIES_KEY = 'guest_saved_properties';

	let isLiked = false;
	let isLoading = false;
	let guestSavedProperties: string[] = [];

	function readGuestSavedProperties(): string[] {
		try {
			const stored = localStorage.getItem(GUEST_SAVED_PROPERTIES_KEY);
			const parsed = stored ? JSON.parse(stored) : [];

			return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
		} catch (err) {
			console.warn('Errore nella lettura degli immobili salvati localmente:', err);
			return [];
		}
	}

	function writeGuestSavedProperties(propertyIds: string[]) {
		try {
			localStorage.setItem(GUEST_SAVED_PROPERTIES_KEY, JSON.stringify(propertyIds));
		} catch (err) {
			console.warn("Errore nel salvataggio locale dell'immobile:", err);
		}
	}

	onMount(() => {
		guestSavedProperties = readGuestSavedProperties();

		function handleStorage(event: StorageEvent) {
			if (event.key === GUEST_SAVED_PROPERTIES_KEY) {
				guestSavedProperties = readGuestSavedProperties();
			}
		}

		window.addEventListener('storage', handleStorage);

		return () => {
			window.removeEventListener('storage', handleStorage);
		};
	});

	// Check if property is in user's saved_properties
	$: if ($currentUser) {
		isLiked = $currentUser.saved_properties?.includes(property.id) ?? false;
	} else {
		isLiked = guestSavedProperties.includes(property.id);
	}

	function toggleLike(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		if (!$currentUser) {
			const updated = isLiked
				? guestSavedProperties.filter((id) => id !== property.id)
				: Array.from(new Set([...guestSavedProperties, property.id]));

			guestSavedProperties = updated;
			writeGuestSavedProperties(updated);
			return;
		}

		isLoading = true;
		const savedProps = $currentUser.saved_properties || [];
		const updated = isLiked
			? savedProps.filter((id: string) => id !== property.id)
			: [...savedProps, property.id];

		pb.collection('users')
			.update($currentUser.id, { saved_properties: updated })
			.then(() => {
				isLiked = !isLiked;
			})
			.catch((err) => {
				console.error('Errore nel salvataggio immobile:', err);
			})
			.finally(() => {
				isLoading = false;
			});
	}

	function handleClick() {
		goto(`/immobili/${property.slug}`);
	}

	// Get first image or placeholder
	const imageName = property.cover_image || property.images?.[0];
	const imageUrl = imageName
		? getPropertyThumbnailUrl(property.id, imageName)
		: '/placeholder-property.jpg';

	// Determine badge
	const badgeInfo = {
		for_sale: { bg: 'bg-primary', text: 'In Vendita' },
		for_rent: { bg: 'bg-accent', text: 'In Affitto' },
		sold: { bg: 'bg-muted-foreground', text: 'Venduto' },
		rented: { bg: 'bg-muted-foreground/80', text: 'Affittato' }
	};
	const badge = badgeInfo[property.status as keyof typeof badgeInfo] || badgeInfo.for_sale;
</script>

<div
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	class="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	<!-- Image Container (60%) -->
	<div class="relative h-[240px] overflow-hidden bg-muted">
		<img
			src={imageUrl}
			alt={property.title}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>

		<!-- Status Badge -->
		<div class={`absolute left-3 top-3 rounded px-2 py-1 text-xs font-bold text-white ${badge.bg}`}>
			{badge.text}
		</div>

		<!-- Like Button -->
		<button
			on:click={toggleLike}
			disabled={isLoading}
			class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-all duration-200 hover:bg-white disabled:opacity-50"
			aria-label="Salva immobile"
		>
			<Heart
				size={20}
				class="transition-all {isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}"
			/>
		</button>

		<!-- Featured Badge (if applicable) -->
		{#if property.featured}
			<div
				class="absolute bottom-3 right-3 rounded bg-accent px-2 py-1 text-xs font-bold text-white"
			>
				In Evidenza
			</div>
		{/if}
	</div>

	<!-- Content Container (40%) -->
	<div class="flex flex-col gap-3 p-4">
		<!-- Price -->
		<div class="text-xl font-bold text-foreground">
			{formatCurrency(property.price)}
		</div>

		<!-- Title -->
		<h3 class="truncate text-lg font-medium text-foreground">
			{property.title}
		</h3>

		<!-- Address -->
		<div class="flex items-center gap-1 text-sm text-muted-foreground">
			<MapPin size={16} />
			<span class="truncate">{property.address}, {property.city}</span>
		</div>

		<!-- Specs Row -->
		<div class="border-t border-border pt-3">
			<div class="flex gap-4 text-sm text-muted-foreground">
				{#if property.rooms}
					<div class="flex items-center gap-1" title="Locali">
						<DoorOpen size={16} />
						<span>{property.rooms}</span>
					</div>
				{:else if property.bedrooms}
					<div class="flex items-center gap-1" title="Camere">
						<Bed size={16} />
						<span>{property.bedrooms}</span>
					</div>
				{/if}
				{#if property.bathrooms}
					<div class="flex items-center gap-1" title="Bagni">
						<Bath size={16} />
						<span>{property.bathrooms}</span>
					</div>
				{/if}
				{#if property.area_sqm}
					<div class="flex items-center gap-1" title="Superficie">
						<Square size={16} />
						<span>{formatArea(property.area_sqm)}</span>
					</div>
				{/if}
				{#if property.floor != null && property.floor >= 0 && property.total_floors}
					<div class="flex items-center gap-1" title="Piano">
						<ArrowUpDown size={16} />
						<span>{property.floor === 0 ? 'T' : property.floor}/{property.total_floors}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
