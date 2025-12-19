<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/stores/auth';
	import { getPropertyThumbnailUrl, formatCurrency, formatArea } from '$lib/utils';
	import { Heart, MapPin, Bed, Bath, Square } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';
	import { pb } from '$lib/pocketbase';

	export let property: RecordModel;

	let isLiked = false;
	let isLoading = false;

	// Check if property is in user's saved_properties
	$: if ($currentUser) {
		isLiked = $currentUser.saved_properties?.includes(property.id) ?? false;
	}

	function toggleLike(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		if (!$currentUser) {
			// TODO: Show modal to login
			alert('Accedi per salvare immobili');
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
				alert('Errore nel salvataggio immobile');
			})
			.finally(() => {
				isLoading = false;
			});
	}

	function handleClick() {
		goto(`/immobili/${property.slug}`);
	}

	// Get first image or placeholder
	const imageName = property.images?.[0];
	console.log('Property images:', property.images);
	const imageUrl = imageName
		? getPropertyThumbnailUrl(property.id, imageName)
		: '/placeholder-property.jpg';

	console.log('Image URL:', imageUrl);

	// Determine badge
	const badgeInfo = {
		for_sale: { bg: 'bg-emerald-500', text: 'For Sale' },
		for_rent: { bg: 'bg-blue-500', text: 'For Rent' },
		sold: { bg: 'bg-gray-500', text: 'Sold' },
		rented: { bg: 'bg-slate-500', text: 'Rented' }
	};
	const badge = badgeInfo[property.status as keyof typeof badgeInfo] || badgeInfo.for_sale;
</script>

<div
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	class="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	<!-- Image Container (60%) -->
	<div class="relative h-[240px] overflow-hidden bg-gray-200">
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
				class="transition-all {isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}"
			/>
		</button>

		<!-- Featured Badge (if applicable) -->
		{#if property.featured}
			<div
				class="absolute bottom-3 right-3 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white"
			>
				Featured
			</div>
		{/if}
	</div>

	<!-- Content Container (40%) -->
	<div class="flex flex-col gap-3 p-4">
		<!-- Price -->
		<div class="text-xl font-bold text-gray-900">
			{formatCurrency(property.price)}
		</div>

		<!-- Title -->
		<h3 class="truncate text-lg font-medium text-gray-800">
			{property.title}
		</h3>

		<!-- Address -->
		<div class="flex items-center gap-1 text-sm text-gray-500">
			<MapPin size={16} />
			<span class="truncate">{property.address}, {property.city}</span>
		</div>

		<!-- Specs Row -->
		<div class="border-t border-gray-200 pt-3">
			<div class="flex gap-4 text-sm text-gray-600">
				{#if property.bedrooms}
					<div class="flex items-center gap-1">
						<Bed size={16} />
						<span>{property.bedrooms}</span>
					</div>
				{/if}
				{#if property.bathrooms}
					<div class="flex items-center gap-1">
						<Bath size={16} />
						<span>{property.bathrooms}</span>
					</div>
				{/if}
				{#if property.area_sqm}
					<div class="flex items-center gap-1">
						<Square size={16} />
						<span>{formatArea(property.area_sqm)}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
