<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Pencil, Plus, Trash2 } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	let locations = $state<RecordModel[]>([]);
	let loading = $state(true);
	let deleting = $state<string | null>(null);
	let error = $state('');

	async function loadLocations() {
		loading = true;
		error = '';
		try {
			locations = await pb.collection('seo_locations').getFullList({
				sort: 'name',
				expand: 'nearby_locations'
			});
		} catch (err) {
			console.error('SEO locations load error:', err);
			error = 'Impossibile caricare i comuni SEO. Verifica che la collezione remota sia configurata.';
		} finally {
			loading = false;
		}
	}

	async function deleteLocation(location: RecordModel) {
		if (!confirm(`Eliminare il comune “${location.name}”? Elimina prima le relative pagine SEO.`)) return;
		deleting = location.id;
		try {
			await pb.collection('seo_locations').delete(location.id);
			await loadLocations();
		} catch (err) {
			console.error('SEO location delete error:', err);
			alert('Eliminazione non riuscita. Il comune potrebbe essere ancora usato da pagine SEO.');
		} finally {
			deleting = null;
		}
	}

	function nearbyNames(location: RecordModel) {
		const expanded = location.expand?.nearby_locations;
		if (!expanded) return '—';
		const records = Array.isArray(expanded) ? expanded : [expanded];
		return records.map((record) => record.name).join(', ') || '—';
	}

	onMount(loadLocations);
</script>

<svelte:head><title>Comuni SEO | REI Admin</title></svelte:head>

<div>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<a href="/admin/seo" class="text-sm text-primary hover:underline">← SEO locale</a>
			<h1 class="mt-2 text-2xl font-bold">Comuni SEO</h1>
			<p class="mt-1 text-sm text-muted-foreground">{locations.length} comuni configurati</p>
		</div>
		<a href="/admin/seo/comuni/nuovo" class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
			<Plus class="h-4 w-4" /> Nuovo comune
		</a>
	</div>

	{#if error}
		<div class="mt-6 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
	{/if}

	{#if loading}
		<div class="mt-12 flex justify-center"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
	{:else if locations.length === 0 && !error}
		<div class="mt-12 border-y py-10 text-center">
			<p class="text-muted-foreground">Nessun comune configurato.</p>
			<a href="/admin/seo/comuni/nuovo" class="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Aggiungi il primo comune</a>
		</div>
	{:else if locations.length > 0}
		<div class="mt-6 overflow-x-auto rounded-lg border bg-background">
			<table class="w-full text-sm">
				<thead><tr class="border-b bg-muted/50">
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Comune</th>
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Comuni vicini</th>
					<th class="px-4 py-3 text-right font-medium text-muted-foreground">Azioni</th>
				</tr></thead>
				<tbody>
					{#each locations as location (location.id)}
						<tr class="border-b last:border-0 hover:bg-muted/30">
							<td class="px-4 py-3"><a href={`/admin/seo/comuni/${location.id}`} class="font-semibold hover:text-primary">{location.name}</a><small class="block text-muted-foreground">{location.province || 'Provincia non indicata'}</small></td>
							<td class="px-4 py-3 font-mono text-xs text-muted-foreground">{location.slug}</td>
							<td class="hidden max-w-md px-4 py-3 text-muted-foreground md:table-cell">{nearbyNames(location)}</td>
							<td class="px-4 py-3"><div class="flex justify-end gap-1">
								<a href={`/admin/seo/comuni/${location.id}`} class="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Modifica ${location.name}`}><Pencil class="h-4 w-4" /></a>
								<button onclick={() => deleteLocation(location)} disabled={deleting === location.id} class="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50" aria-label={`Elimina ${location.name}`}><Trash2 class="h-4 w-4" /></button>
							</div></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
