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
		{ value: 'for_sale', label: 'Buy' },
		{ value: 'for_rent', label: 'Rent' }
	];

	const propertyTypes = [
		{ value: 'house', label: 'House' },
		{ value: 'apartment', label: 'Apartment' },
		{ value: 'commercial', label: 'Commercial' },
		{ value: 'land', label: 'Land' }
	];

	const bedroomOptions = ['Any', '1', '2', '3', '4+'];

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

		goto(`/properties?${params.toString()}`, { replaceState: true });
		isOpen = false;
	}

	function resetFilters() {
		keyword = '';
		status = 'for_sale';
		minPrice = '';
		maxPrice = '';
		propertyType = '';
		bedrooms = '';
		goto('/properties', { replaceState: true });
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
	class={`fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 transition-transform duration-300 lg:static lg:max-h-none lg:w-80 lg:rounded-none lg:border-r lg:border-gray-200 lg:p-6 ${
		isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
	}`}
>
	<!-- Header (Mobile Only) -->
	<div class="mb-6 flex items-center justify-between lg:hidden">
		<h2 class="text-xl font-bold text-gray-900">Filters</h2>
		<button
			on:click={() => (isOpen = false)}
			class="text-gray-500 hover:text-gray-700"
			aria-label="Close filters"
		>
			<X size={24} />
		</button>
	</div>

	<!-- Keyword Search -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-gray-700">Search</label>
		<input
			type="text"
			bind:value={keyword}
			placeholder="City, zip, address..."
			class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>
	</div>

	<!-- Status Toggle -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-gray-700 mb-3">Type</label>
		<div class="flex gap-2">
			{#each statusOptions as opt (opt.value)}
				<button
					on:click={() => (status = opt.value)}
					class={`flex-1 rounded-lg py-2 px-3 font-medium transition-all ${
						status === opt.value
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Price Range -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
		<div class="grid grid-cols-2 gap-2">
			<input
				type="number"
				bind:value={minPrice}
				placeholder="Min"
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
			/>
			<input
				type="number"
				bind:value={maxPrice}
				placeholder="Max"
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
			/>
		</div>
	</div>

	<!-- Property Type -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
		<div class="space-y-2">
			{#each propertyTypes as type (type.value)}
				<label class="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						checked={propertyType === type.value}
						on:change={() =>
							(propertyType = propertyType === type.value ? '' : type.value)}
						class="h-4 w-4 rounded border-gray-300 text-blue-500"
					/>
					<span class="text-sm text-gray-700">{type.label}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Bedrooms -->
	<div class="mb-6">
		<label class="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
		<div class="flex flex-wrap gap-2">
			{#each bedroomOptions as option (option)}
				<button
					on:click={() => handleBedroomClick(option)}
					class={`h-10 w-10 rounded-full font-medium transition-all ${
						bedrooms === option
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
			class="flex-1 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50"
		>
			Reset
		</button>
		<button
			on:click={applyFilters}
			class="flex-1 rounded-lg bg-blue-500 py-2.5 font-medium text-white transition-all hover:bg-blue-600"
		>
			Apply
		</button>
	</div>
</aside>

<!-- Mobile FAB Button -->
<button
	on:click={() => (isOpen = !isOpen)}
	class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 lg:hidden"
	aria-label="Open filters"
>
	<Filter size={24} />
</button>
