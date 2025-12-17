<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$lib/components/listing/PropertyCard.svelte';
	import FilterSidebar from '$lib/components/listing/FilterSidebar.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let data;

	let filterOpen = false;

	$: properties = data.properties || [];
	$: totalPages = data.totalPages || 0;
	$: currentPage = data.currentPage || 1;

	function goToPage(p: number) {
		if (p < 1 || p > totalPages) return;
		const newUrl = new URL($page.url);
		newUrl.searchParams.set('page', p.toString());
		window.location.href = newUrl.toString();
	}
</script>

<svelte:head>
	<title>Properties for Sale & Rent | Paons Immobiliare</title>
	<meta
		name="description"
		content="Browse our selection of properties for sale and rent in Ireland. Find your dream home with Paons Immobiliare."
	/>
</svelte:head>

<div class="flex min-h-screen bg-gray-50 lg:gap-0">
	<!-- Filters Sidebar -->
	<FilterSidebar bind:isOpen={filterOpen} />

	<!-- Main Content -->
	<main class="flex-1">
		<!-- Header -->
		<div class="border-b border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<h1 class="text-3xl font-bold text-gray-900">Properties</h1>
				<p class="mt-2 text-gray-600">
					{data.totalItems} properties found
				</p>
			</div>
		</div>

		<!-- Properties Grid -->
		<div class="px-4 py-8 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				{#if properties.length > 0}
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{#each properties as property (property.id)}
							<PropertyCard {property} />
						{/each}
					</div>

					<!-- Pagination -->
					{#if totalPages > 1}
						<div class="mt-12 flex items-center justify-center gap-2">
							<button
								on:click={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1}
								class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all disabled:opacity-50 hover:enabled:bg-gray-50"
								aria-label="Previous page"
							>
								<ChevronLeft size={20} />
								<span class="hidden sm:inline">Previous</span>
							</button>

							<div class="flex gap-1">
								{#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									const pageNum = Math.max(1, currentPage - 2) + i;
									if (pageNum > totalPages) return null;
									return pageNum;
								}) as pageNum (pageNum)}
									{#if pageNum}
										<button
											on:click={() => goToPage(pageNum)}
											class={`h-10 w-10 rounded-lg font-medium transition-all ${
												currentPage === pageNum
													? 'bg-blue-500 text-white'
													: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
											}`}
										>
											{pageNum}
										</button>
									{/if}
								{/each}
							</div>

							<button
								on:click={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all disabled:opacity-50 hover:enabled:bg-gray-50"
								aria-label="Next page"
							>
								<span class="hidden sm:inline">Next</span>
								<ChevronRight size={20} />
							</button>
						</div>
					{/if}
				{:else}
					<div class="py-12 text-center">
						<h3 class="text-lg font-medium text-gray-900">No properties found</h3>
						<p class="mt-1 text-gray-600">Try adjusting your filters</p>
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>
