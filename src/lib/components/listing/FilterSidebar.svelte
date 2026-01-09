<script lang="ts">
	import { goto } from '$app/navigation';
	import { Filter, X } from 'lucide-svelte';

	export let isOpen = false;

	// Filter state
	let keyword = '';
	let status = 'for_sale';
	let minPrice: string | number = '';
	let maxPrice: string | number = '';
	let propertyType = '';
	let bedrooms = '';

	// Options
	const statusOptions = [
		{ value: 'for_sale', label: 'In Vendita' },
		{ value: 'for_rent', label: 'In Affitto' }
	];

	const propertyTypes = [
		{ value: 'house', label: 'Casa' },
		{ value: 'apartment', label: 'Appartamento' },
		{ value: 'commercial', label: 'Commerciale' },
		{ value: 'land', label: 'Terreno' }
	];

	const bedroomOptions = ['1', '2', '3', '4+'];

	function applyFilters() {
		const params = new URLSearchParams();

		if (keyword) params.set('keyword', keyword);
		params.set('status', status);
		if (minPrice) params.set('minPrice', minPrice.toString());
		if (maxPrice) params.set('maxPrice', maxPrice.toString());
		if (propertyType) params.set('type', propertyType);
		if (bedrooms && bedrooms !== 'Any') {
			if (bedrooms === '4+') {
				params.set('minBedrooms', '4');
			} else {
				params.set('bedrooms', bedrooms);
			}
		}

		goto(`/immobili?${params.toString()}`, { replaceState: true });
		isOpen = false;
	}

	function resetFilters() {
		keyword = '';
		status = 'for_sale';
		minPrice = '';
		maxPrice = '';
		propertyType = '';
		bedrooms = '';
		goto('/immobili', { replaceState: true });
		isOpen = false;
	}

	function handleBedroomClick(value: string) {
		bedrooms = bedrooms === value ? '' : value;
	}
</script>

<!-- Mobile Overlay -->
{#if isOpen}
	<div
		class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden"
		on:click={() => (isOpen = false)}
		role="button"
		tabindex={-1}
	/>
{/if}

<!-- Sidebar -->
<aside
	class={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-card p-6 transition-transform duration-300 lg:static lg:max-h-none lg:w-80 lg:rounded-none lg:border-r lg:border-border lg:p-6 ${
		isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
	}`}
>
	<!-- Header (Mobile Only) -->
	<div class="mb-6 flex items-center justify-between lg:hidden">
		<h2 class="text-xl font-bold text-foreground">Filtri</h2>
		<button
			on:click={() => (isOpen = false)}
			class="text-muted-foreground hover:text-foreground"
			aria-label="Chiudi filtri"
		>
			<X size={24} />
		</button>
	</div>

	<!-- Keyword Search -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-foreground">Ricerca</label>
		<input
			type="text"
			bind:value={keyword}
			placeholder="Città, CAP, indirizzo..."
			class="mt-2 w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
		/>
	</div>

	<!-- Status Toggle -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-foreground mb-3">Tipo</label>
		<div class="flex gap-2">
			{#each statusOptions as opt (opt.value)}
				<button
					on:click={() => (status = opt.value)}
					class={`flex-1 rounded-md py-2 px-3 font-medium transition-all ${
						status === opt.value
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-foreground hover:bg-muted/80'
					}`}
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Price Range -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-foreground mb-3">Fascia Prezzo</label>
		<div class="grid grid-cols-2 gap-2">
			<input
				type="number"
				bind:value={minPrice}
				placeholder="Min"
				class="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
			/>
			<input
				type="number"
				bind:value={maxPrice}
				placeholder="Max"
				class="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
			/>
		</div>
	</div>

	<!-- Property Type -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-foreground mb-3">Tipo di Immobile</label>
		<div class="space-y-2">
			{#each propertyTypes as type (type.value)}
				<label class="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						checked={propertyType === type.value}
						on:change={() =>
							(propertyType = propertyType === type.value ? '' : type.value)}
						class="h-4 w-4 rounded border-input text-primary focus:ring-primary"
					/>
					<span class="text-sm text-foreground">{type.label}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Bedrooms -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-foreground mb-3">Camere da Letto</label>
		<div class="flex flex-wrap gap-2">
			{#each bedroomOptions as option (option)}
				<button
					on:click={() => handleBedroomClick(option)}
					class={`h-10 w-10 rounded-full font-medium transition-all ${
						bedrooms === option
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-foreground hover:bg-muted/80'
					}`}
				>
					{option}
				</button>
			{/each}
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="flex gap-3 pt-6">
		<button
			on:click={resetFilters}
			class="flex-1 rounded-md border border-input bg-background py-2.5 font-medium text-foreground transition-all hover:bg-muted"
		>
			Ripristina
		</button>
		<button
			on:click={applyFilters}
			class="flex-1 rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90"
		>
			Applica
		</button>
	</div>
</aside>

<!-- Mobile FAB Button -->
<button
	on:click={() => (isOpen = !isOpen)}
	class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 lg:hidden"
	aria-label="Apri filtri"
>
	<Filter size={24} />
</button>
