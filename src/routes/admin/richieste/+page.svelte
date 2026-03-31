<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let inquiries = $state<any[]>([]);
	let currentPage = $state(1);
	let totalPages = $state(0);
	let totalItems = $state(0);
	let loading = $state(true);
	let filterStatus = $state('');

	const perPage = 20;

	const statusLabels: Record<string, string> = {
		new: 'Nuova',
		read: 'Letta',
		responded: 'Risposta'
	};
	const statusColors: Record<string, string> = {
		new: 'bg-amber-100 text-amber-800',
		read: 'bg-blue-100 text-blue-800',
		responded: 'bg-green-100 text-green-800'
	};

	async function loadInquiries() {
		loading = true;
		try {
			let filter = '';
			if (filterStatus) {
				filter = `status = "${filterStatus}"`;
			}
			const result = await pb.collection('inquiries').getList(currentPage, perPage, {
				sort: '-created',
				expand: 'property',
				filter
			});
			inquiries = result.items;
			totalPages = result.totalPages;
			totalItems = result.totalItems;
		} catch (err) {
			console.error('Load error:', err);
		} finally {
			loading = false;
		}
	}

	function goToPage(p: number) {
		if (p < 1 || p > totalPages) return;
		currentPage = p;
		loadInquiries();
	}

	function onFilterChange() {
		currentPage = 1;
		loadInquiries();
	}

	onMount(loadInquiries);
</script>

<svelte:head>
	<title>Richieste | REI Admin</title>
</svelte:head>

<div>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold text-foreground">Richieste</h1>
			<p class="mt-1 text-sm text-muted-foreground">{totalItems} richieste totali</p>
		</div>
		<select
			bind:value={filterStatus}
			onchange={onFilterChange}
			class="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
		>
			<option value="">Tutte le richieste</option>
			<option value="new">Nuove</option>
			<option value="read">Lette</option>
			<option value="responded">Con risposta</option>
		</select>
	</div>

	{#if loading}
		<div class="mt-8 flex justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
			></div>
		</div>
	{:else if inquiries.length === 0}
		<div class="mt-12 text-center">
			<p class="text-muted-foreground">Nessuna richiesta trovata.</p>
		</div>
	{:else}
		<div class="mt-6 overflow-x-auto rounded-lg border bg-background">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Cliente</th>
						<th
							class="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell"
							>Email</th
						>
						<th
							class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Immobile</th
						>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Stato</th>
						<th
							class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell"
							>Data</th
						>
					</tr>
				</thead>
				<tbody>
					{#each inquiries as inq (inq.id)}
						<tr class="border-b last:border-0 hover:bg-muted/30">
							<td class="px-4 py-3">
								<a
									href="/admin/richieste/{inq.id}"
									class="font-medium text-foreground hover:text-primary"
								>
									{inq.customer_name}
								</a>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground sm:table-cell">
								{inq.customer_email}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
								{inq.expand?.property?.title ?? '—'}
							</td>
							<td class="px-4 py-3">
								<span
									class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium {statusColors[
										inq.status
									] ?? ''}"
								>
									{statusLabels[inq.status] ?? inq.status}
								</span>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
								{new Date(inq.created).toLocaleDateString('it-IT')}
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
