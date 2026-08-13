<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { seoPagePayload } from '$lib/admin/seo';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import PageForm from '../../PageForm.svelte';

	let locations = $state<RecordModel[]>([]);
	let loadingOptions = $state(true);
	let isLoading = $state(false);
	let error = $state('');

	onMount(async () => {
		try {
			locations = await pb.collection('seo_locations').getFullList({ sort: 'name' });
		} catch (err) {
			console.error('SEO page location options error:', err);
			error = 'Impossibile caricare i comuni. Creane almeno uno prima della pagina.';
		} finally {
			loadingOptions = false;
		}
	});

	async function handleSubmit(values: Parameters<typeof seoPagePayload>[0]) {
		isLoading = true;
		error = '';
		try {
			await pb.collection('seo_pages').create(seoPagePayload(values));
			goto('/admin/seo/pagine');
		} catch (err) {
			console.error('SEO page create error:', err);
			error = err instanceof Error ? err.message : 'Creazione non riuscita.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head><title>Nuova pagina SEO | REI Admin</title></svelte:head>

<div class="max-w-4xl">
	<a href="/admin/seo/pagine" class="text-sm text-primary hover:underline">← Pagine locali</a>
	<h1 class="mt-2 text-2xl font-bold">Nuova pagina locale</h1>
	<p class="mt-1 text-sm text-muted-foreground">Abilita una combinazione comune e intento.</p>
	{#if error}<div class="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>{/if}
	<div class="mt-6">
		{#if loadingOptions}<div class="flex justify-center py-12"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
		{:else if locations.length === 0}<div class="rounded-lg border bg-background p-6 text-sm text-muted-foreground">Aggiungi prima un <a href="/admin/seo/comuni/nuovo" class="font-semibold text-primary hover:underline">comune SEO</a>.</div>
		{:else}<PageForm {locations} onsubmit={handleSubmit} {isLoading} />{/if}
	</div>
</div>
