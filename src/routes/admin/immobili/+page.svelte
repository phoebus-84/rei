<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-svelte';

	let properties = $state<any[]>([]);
	let currentPage = $state(1);
	let totalPages = $state(0);
	let totalItems = $state(0);
	let loading = $state(true);
	let deleting = $state<string | null>(null);

	const perPage = 20;

	const statusLabels: Record<string, string> = {
		for_sale: 'In vendita',
		for_rent: 'In affitto',
		sold: 'Venduto',
		rented: 'Affittato'
	};
	const statusColors: Record<string, string> = {
		for_sale: 'bg-green-100 text-green-800',
		for_rent: 'bg-blue-100 text-blue-800',
		sold: 'bg-gray-100 text-gray-800',
		rented: 'bg-gray-100 text-gray-800'
	};

	async function loadProperties() {
		loading = true;
		try {
			const result = await pb.collection('properties').getList(currentPage, perPage, {
				sort: '-created'
			});
			properties = result.items;
			totalPages = result.totalPages;
			totalItems = result.totalItems;
		} catch (err) {
			console.error('Load error:', err);
		} finally {
			loading = false;
		}
	}

	async function deleteProperty(id: string, title: string) {
		if (!confirm(`Eliminare "${title}"? Questa azione non è reversibile.`)) return;
		deleting = id;
		try {
			await pb.collection('properties').delete(id);
			await loadProperties();
		} catch (err) {
			console.error('Delete error:', err);
			alert("Errore durante l'eliminazione.");
		} finally {
			deleting = null;
		}
	}

	function goToPage(p: number) {
		if (p < 1 || p > totalPages) return;
		currentPage = p;
		loadProperties();
	}

	function getThumbUrl(property: any): string {
		if (!property.images?.length) return '';
		return pb.files.getUrl(property, property.images[0], { thumb: '80x80' });
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('it-IT', {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: 0
		}).format(price);
	}

	onMount(loadProperties);
</script>

<svelte:head>
	<title>Immobili | REI Admin</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-foreground">Immobili</h1>
			<p class="mt-1 text-sm text-muted-foreground">{totalItems} immobili totali</p>
		</div>
		<a
			href="/admin/immobili/nuovo"
			class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
		>
			<Plus class="h-4 w-4" />
			Nuovo immobile
		</a>
	</div>

	{#if loading}
		<div class="mt-8 flex justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
			></div>
		</div>
	{:else if properties.length === 0}
		<div class="mt-12 text-center">
			<p class="text-muted-foreground">Nessun immobile presente.</p>
			<a
				href="/admin/immobili/nuovo"
				class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
			>
				<Plus class="h-4 w-4" /> Aggiungi il primo immobile
			</a>
		</div>
	{:else}
		<div class="mt-6 overflow-x-auto rounded-lg border bg-background">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="w-16 px-4 py-3"></th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Titolo</th>
						<th
							class="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell"
							>Città</th
						>
						<th
							class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Stato</th
						>
						<th
							class="hidden px-4 py-3 text-right font-medium text-muted-foreground lg:table-cell"
							>Prezzo</th
						>
						<th class="px-4 py-3 text-right font-medium text-muted-foreground">Azioni</th>
					</tr>
				</thead>
				<tbody>
					{#each properties as prop (prop.id)}
						<tr class="border-b last:border-0 hover:bg-muted/30">
							<td class="px-4 py-3">
								{#if getThumbUrl(prop)}
									<img
										src={getThumbUrl(prop)}
										alt=""
										class="h-10 w-10 rounded object-cover"
									/>
								{:else}
									<div class="h-10 w-10 rounded bg-muted"></div>
								{/if}
							</td>
							<td class="px-4 py-3">
								<a
									href="/admin/immobili/{prop.id}"
									class="font-medium text-foreground hover:text-primary"
								>
									{prop.title}
								</a>
								{#if prop.featured}
									<span class="ml-2 text-xs text-amber-600">★</span>
								{/if}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground sm:table-cell"
								>{prop.city}</td
							>
							<td class="hidden px-4 py-3 md:table-cell">
								<span
									class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium {statusColors[
										prop.status
									] ?? ''}"
								>
									{statusLabels[prop.status] ?? prop.status}
								</span>
							</td>
							<td class="hidden px-4 py-3 text-right text-muted-foreground lg:table-cell">
								{formatPrice(prop.price)}
							</td>
							<td class="px-4 py-3 text-right">
								<div class="flex items-center justify-end gap-1">
									<a
										href="/admin/immobili/{prop.id}"
										class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										title="Modifica"
									>
										<Pencil class="h-4 w-4" />
									</a>
									<button
										onclick={() => deleteProperty(prop.id, prop.title)}
										disabled={deleting === prop.id}
										class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
										title="Elimina"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if totalPages > 1}
			<div class="mt-4 flex items-center justify-between">
				<p class="text-sm text-muted-foreground">Pagina {currentPage} di {totalPages}</p>
				<div class="flex gap-1">
					<button
						onclick={() => goToPage(currentPage - 1)}
						disabled={currentPage <= 1}
						class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:enabled:bg-muted"
					>
						<ChevronLeft class="h-4 w-4" />
					</button>
					<button
						onclick={() => goToPage(currentPage + 1)}
						disabled={currentPage >= totalPages}
						class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 hover:enabled:bg-muted"
					>
						<ChevronRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>
