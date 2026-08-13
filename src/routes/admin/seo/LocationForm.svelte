<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import { MapPin } from 'lucide-svelte';
	import { normalizeSeoSlug } from '$lib/admin/seo';

	type Values = {
		slug: string;
		name: string;
		province: string;
		region: string;
		latitude: string | number;
		longitude: string | number;
		nearbyLocationIds: string[];
	};

	type Props = {
		location?: RecordModel | null;
		locations: RecordModel[];
		isLoading?: boolean;
		onsubmit: (values: Values) => void | Promise<void>;
	};

	let { location = null, locations, isLoading = false, onsubmit }: Props = $props();
	// Form props are fixed for the lifetime of each create/edit route.
	// svelte-ignore state_referenced_locally
	let name = $state(location?.name ?? '');
	// svelte-ignore state_referenced_locally
	let slug = $state(location?.slug ?? '');
	// svelte-ignore state_referenced_locally
	let province = $state(location?.province ?? 'Torino');
	// svelte-ignore state_referenced_locally
	let region = $state(location?.region ?? 'Piemonte');
	// svelte-ignore state_referenced_locally
	let latitude = $state<string | number>(location?.latitude ?? '');
	// svelte-ignore state_referenced_locally
	let longitude = $state<string | number>(location?.longitude ?? '');
	// svelte-ignore state_referenced_locally
	let nearbyLocationIds = $state<string[]>(
		Array.isArray(location?.nearby_locations) ? location.nearby_locations : []
	);
	// svelte-ignore state_referenced_locally
	let slugTouched = $state(Boolean(location));

	const inputClass =
		'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
	const availableLocations = $derived(locations.filter((item) => item.id !== location?.id));

	function updateName(value: string) {
		name = value;
		if (!slugTouched) slug = normalizeSeoSlug(value);
	}

	function toggleNearby(id: string) {
		nearbyLocationIds = nearbyLocationIds.includes(id)
			? nearbyLocationIds.filter((value) => value !== id)
			: [...nearbyLocationIds, id];
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onsubmit({
			slug,
			name,
			province,
			region,
			latitude,
			longitude,
			nearbyLocationIds
		});
	}
</script>

<form class="space-y-8" onsubmit={handleSubmit}>
	<section class="rounded-lg border bg-background p-6">
		<div class="flex items-start gap-3">
			<MapPin class="mt-0.5 h-5 w-5 text-primary" />
			<div>
				<h2 class="font-semibold text-foreground">Comune e URL</h2>
				<p class="mt-1 text-sm text-muted-foreground">
					Il nome viene mostrato agli utenti; lo slug ASCII identifica l’unico URL canonico.
				</p>
			</div>
		</div>

		<div class="mt-6 grid gap-5 sm:grid-cols-2">
			<label class="space-y-2">
				<span class="text-sm font-medium">Nome del comune *</span>
				<input
					value={name}
					oninput={(event) => updateName(event.currentTarget.value)}
					required
					class={inputClass}
					placeholder="Cuorgnè"
				/>
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Slug canonico *</span>
				<input
					bind:value={slug}
					oninput={() => (slugTouched = true)}
					required
					pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
					class={inputClass}
					placeholder="cuorgne"
				/>
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Provincia</span>
				<input bind:value={province} class={inputClass} placeholder="Torino" />
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Regione</span>
				<input bind:value={region} class={inputClass} placeholder="Piemonte" />
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Latitudine</span>
				<input bind:value={latitude} type="number" min="-90" max="90" step="any" class={inputClass} />
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Longitudine</span>
				<input bind:value={longitude} type="number" min="-180" max="180" step="any" class={inputClass} />
			</label>
		</div>
	</section>

	<section class="rounded-lg border bg-background p-6">
		<h2 class="font-semibold text-foreground">Comuni vicini</h2>
		<p class="mt-1 text-sm leading-6 text-muted-foreground">
			Relazione editoriale multipla. È direzionale: seleziona anche la relazione inversa nel
			comune interessato quando serve.
		</p>

		{#if availableLocations.length === 0}
			<p class="mt-5 text-sm text-muted-foreground">Aggiungi altri comuni per collegarli.</p>
		{:else}
			<div class="mt-5 grid gap-2 sm:grid-cols-2">
				{#each availableLocations as option (option.id)}
					<label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-2 hover:bg-muted/40">
						<input
							type="checkbox"
							checked={nearbyLocationIds.includes(option.id)}
							onchange={() => toggleNearby(option.id)}
							class="h-4 w-4 rounded border-input text-primary focus:ring-primary"
						/>
						<span class="text-sm"><strong>{option.name}</strong> <span class="text-muted-foreground">/{option.slug}</span></span>
					</label>
				{/each}
			</div>
		{/if}
	</section>

	<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<a href="/admin/seo/comuni" class="rounded-md border px-5 py-2.5 text-center text-sm font-medium hover:bg-muted">Annulla</a>
		<button type="submit" disabled={isLoading} class="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
			{isLoading ? 'Salvataggio…' : location ? 'Aggiorna comune' : 'Crea comune'}
		</button>
	</div>
</form>
