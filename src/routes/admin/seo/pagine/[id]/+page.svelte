<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { seoPagePayload } from '$lib/admin/seo';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import PageForm from '../../PageForm.svelte';

	let seoPage = $state<RecordModel | null>(null);
	let locations = $state<RecordModel[]>([]);
	let loading = $state(true);
	let isLoading = $state(false);
	let error = $state('');

	onMount(async () => {
		try {
			[seoPage, locations] = await Promise.all([
				pb.collection('seo_pages').getOne(page.params.id!, { expand: 'location' }),
				pb.collection('seo_locations').getFullList({ sort: 'name' })
			]);
		} catch (err) {
			console.error('SEO page load error:', err);
			error = 'Pagina SEO non trovata.';
		} finally {
			loading = false;
		}
	});

	async function handleSubmit(values: Parameters<typeof seoPagePayload>[0]) {
		isLoading = true;
		error = '';
		try {
			await pb.collection('seo_pages').update(page.params.id!, seoPagePayload(values));
			goto('/admin/seo/pagine');
		} catch (err) {
			console.error('SEO page update error:', err);
			error = err instanceof Error ? err.message : 'Aggiornamento non riuscito.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head><title>Modifica pagina SEO | REI Admin</title></svelte:head>

<div class="max-w-4xl">
	<a href="/admin/seo/pagine" class="text-sm text-primary hover:underline">← Pagine locali</a>
	<h1 class="mt-2 text-2xl font-bold">Modifica pagina locale</h1>
	<p class="mt-1 text-sm text-muted-foreground">Aggiorna pubblicazione, metadata e contenuto editoriale.</p>
	{#if error}<div class="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>{/if}
	<div class="mt-6">
		{#if loading}<div class="flex justify-center py-12"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
		{:else if seoPage}<PageForm {seoPage} {locations} onsubmit={handleSubmit} {isLoading} />{/if}
	</div>
</div>
