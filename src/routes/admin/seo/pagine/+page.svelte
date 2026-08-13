<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { getExpandedLocation, seoIntentLabels } from '$lib/admin/seo';
	import type { SeoIntent } from '$lib/seo/types';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import { ExternalLink, Pencil, Plus, Trash2 } from 'lucide-svelte';

	let seoPages = $state<RecordModel[]>([]);
	let loading = $state(true);
	let deleting = $state<string | null>(null);
	let error = $state('');

	async function loadPages() {
		loading = true;
		error = '';
		try {
			seoPages = await pb.collection('seo_pages').getFullList({
				sort: 'location.name,intent',
				expand: 'location'
			});
		} catch (err) {
			console.error('SEO pages load error:', err);
			error = 'Impossibile caricare le pagine SEO. Verifica la collezione e i permessi remoti.';
		} finally {
			loading = false;
		}
	}

	async function deletePage(record: RecordModel) {
		const location = getExpandedLocation(record);
		if (!confirm(`Eliminare “${seoIntentLabels[record.intent as SeoIntent]} · ${location?.name ?? ''}”?`)) return;
		deleting = record.id;
		try {
			await pb.collection('seo_pages').delete(record.id);
			await loadPages();
		} catch (err) {
			console.error('SEO page delete error:', err);
			alert('Eliminazione non riuscita.');
		} finally {
			deleting = null;
		}
	}

	function publicHref(record: RecordModel) {
		const location = getExpandedLocation(record);
		return location ? `/${record.intent}/${location.slug}` : '';
	}

	onMount(loadPages);
</script>

<svelte:head><title>Pagine SEO | REI Admin</title></svelte:head>

<div>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<a href="/admin/seo" class="text-sm text-primary hover:underline">← SEO locale</a>
			<h1 class="mt-2 text-2xl font-bold">Pagine locali</h1>
			<p class="mt-1 text-sm text-muted-foreground">{seoPages.length} combinazioni configurate</p>
		</div>
		<a href="/admin/seo/pagine/nuova" class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus class="h-4 w-4" /> Nuova pagina</a>
	</div>

	{#if error}<div class="mt-6 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>{/if}
	{#if loading}
		<div class="mt-12 flex justify-center"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
	{:else if seoPages.length === 0 && !error}
		<div class="mt-12 border-y py-10 text-center"><p class="text-muted-foreground">Nessuna pagina locale configurata.</p><a href="/admin/seo/pagine/nuova" class="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Crea la prima pagina</a></div>
	{:else if seoPages.length > 0}
		<div class="mt-6 overflow-x-auto rounded-lg border bg-background">
			<table class="w-full text-sm">
				<thead><tr class="border-b bg-muted/50">
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Pagina</th>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Stato</th>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Indicizzazione</th>
					<th class="px-4 py-3 text-right font-medium text-muted-foreground">Azioni</th>
				</tr></thead>
				<tbody>{#each seoPages as record (record.id)}
					{@const location = getExpandedLocation(record)}
					<tr class="border-b last:border-0 hover:bg-muted/30">
						<td class="px-4 py-3"><a href={`/admin/seo/pagine/${record.id}`} class="font-semibold hover:text-primary">{seoIntentLabels[record.intent as SeoIntent] ?? record.intent} · {location?.name ?? 'Comune mancante'}</a><small class="block font-mono text-muted-foreground">{publicHref(record)}</small></td>
						<td class="hidden px-4 py-3 sm:table-cell"><span class={`rounded-full px-2 py-1 text-xs font-medium ${record.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{record.enabled ? 'Abilitata' : 'Disabilitata'}</span></td>
						<td class="hidden px-4 py-3 md:table-cell"><span class={`rounded-full px-2 py-1 text-xs font-medium ${record.indexable ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{record.indexable ? 'Index' : 'Noindex'}</span></td>
						<td class="px-4 py-3"><div class="flex justify-end gap-1">
							{#if record.enabled && publicHref(record)}<a href={publicHref(record)} target="_blank" rel="noreferrer" class="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Apri pagina pubblica"><ExternalLink class="h-4 w-4" /></a>{/if}
							<a href={`/admin/seo/pagine/${record.id}`} class="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Modifica pagina"><Pencil class="h-4 w-4" /></a>
							<button onclick={() => deletePage(record)} disabled={deleting === record.id} class="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50" aria-label="Elimina pagina"><Trash2 class="h-4 w-4" /></button>
						</div></td>
					</tr>
				{/each}</tbody>
			</table>
		</div>
	{/if}
</div>
