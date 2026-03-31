<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Building2, MessageSquare, Home, TrendingUp } from 'lucide-svelte';

	let stats = $state({
		totalProperties: 0,
		forSale: 0,
		forRent: 0,
		newInquiries: 0,
		totalInquiries: 0
	});
	let recentInquiries = $state<any[]>([]);
	let loading = $state(true);

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

	onMount(async () => {
		try {
			const [propsResult, inquiriesResult, newInqResult, recentInqResult] = await Promise.all([
				pb.collection('properties').getList(1, 1, { fields: 'id' }),
				pb.collection('inquiries').getList(1, 1, { fields: 'id' }),
				pb.collection('inquiries').getList(1, 1, { filter: 'status = "new"', fields: 'id' }),
				pb.collection('inquiries').getList(1, 5, {
					sort: '-created',
					expand: 'property'
				})
			]);

			const [saleResult, rentResult] = await Promise.all([
				pb.collection('properties').getList(1, 1, {
					filter: 'status = "for_sale"',
					fields: 'id'
				}),
				pb.collection('properties').getList(1, 1, {
					filter: 'status = "for_rent"',
					fields: 'id'
				})
			]);

			stats = {
				totalProperties: propsResult.totalItems,
				forSale: saleResult.totalItems,
				forRent: rentResult.totalItems,
				newInquiries: newInqResult.totalItems,
				totalInquiries: inquiriesResult.totalItems
			};
			recentInquiries = recentInqResult.items;
		} catch (err) {
			console.error('Dashboard load error:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Dashboard | REI Admin</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-foreground">Dashboard</h1>
	<p class="mt-1 text-sm text-muted-foreground">Panoramica dell'attività</p>

	{#if loading}
		<div class="mt-8 flex justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
			></div>
		</div>
	{:else}
		<!-- Stats cards -->
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border bg-background p-6">
				<div class="flex items-center gap-3">
					<div class="rounded-md bg-primary/10 p-2">
						<Building2 class="h-5 w-5 text-primary" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Immobili totali</p>
						<p class="text-2xl font-bold">{stats.totalProperties}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-background p-6">
				<div class="flex items-center gap-3">
					<div class="rounded-md bg-green-100 p-2">
						<Home class="h-5 w-5 text-green-700" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">In vendita</p>
						<p class="text-2xl font-bold">{stats.forSale}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-background p-6">
				<div class="flex items-center gap-3">
					<div class="rounded-md bg-blue-100 p-2">
						<TrendingUp class="h-5 w-5 text-blue-700" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">In affitto</p>
						<p class="text-2xl font-bold">{stats.forRent}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-background p-6">
				<div class="flex items-center gap-3">
					<div class="rounded-md bg-amber-100 p-2">
						<MessageSquare class="h-5 w-5 text-amber-700" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Richieste nuove</p>
						<p class="text-2xl font-bold">{stats.newInquiries}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent inquiries -->
		<div class="mt-8">
			<h2 class="text-lg font-semibold text-foreground">Richieste recenti</h2>
			{#if recentInquiries.length === 0}
				<p class="mt-4 text-sm text-muted-foreground">Nessuna richiesta presente.</p>
			{:else}
				<div class="mt-4 overflow-hidden rounded-lg border bg-background">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b bg-muted/50">
								<th class="px-4 py-3 text-left font-medium text-muted-foreground"
									>Cliente</th
								>
								<th
									class="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell"
									>Immobile</th
								>
								<th class="px-4 py-3 text-left font-medium text-muted-foreground">Stato</th>
								<th
									class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
									>Data</th
								>
							</tr>
						</thead>
						<tbody>
							{#each recentInquiries as inq (inq.id)}
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
									<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
										{new Date(inq.created).toLocaleDateString('it-IT')}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/if}
</div>
