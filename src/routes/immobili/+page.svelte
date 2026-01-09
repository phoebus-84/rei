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
	<title>Immobili in Vendita e Affitto | Paons Immobiliare</title>
	<meta
		name="description"
		content="Scopri la nostra selezione di immobili in vendita e affitto. Trova la tua casa ideale con Paons Immobiliare."
	/>
</svelte:head>

<div class="flex min-h-screen bg-background lg:gap-0">
	<!-- Filters Sidebar -->
	<FilterSidebar bind:isOpen={filterOpen} />

	<!-- Main Content -->
	<main class="flex-1">
		<!-- Header -->
		<div class="border-b border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<h1 class="text-3xl font-bold text-foreground">Immobili</h1>
				<p class="mt-2 text-muted-foreground">
					{data.totalItems} immobili trovati
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
								class="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground transition-all disabled:opacity-50 hover:enabled:bg-muted"
								aria-label="Pagina precedente"
							>
								<ChevronLeft size={20} />
								<span class="hidden sm:inline">Precedente</span>
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
													? 'bg-primary text-primary-foreground'
													: 'border border-border text-foreground hover:bg-muted'
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
								class="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground transition-all disabled:opacity-50 hover:enabled:bg-muted"
								aria-label="Pagina successiva"
							>
								<span class="hidden sm:inline">Successiva</span>
								<ChevronRight size={20} />
							</button>
						</div>
					{/if}
				{:else}
					<div class="py-12 text-center">
						<h3 class="text-lg font-medium text-foreground">Nessun immobile trovato</h3>
						<p class="mt-1 text-muted-foreground">Prova ad aggiustare i filtri</p>
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>
