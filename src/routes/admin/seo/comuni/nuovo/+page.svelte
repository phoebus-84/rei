<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { seoLocationPayload } from '$lib/admin/seo';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import LocationForm from '../../LocationForm.svelte';

	let locations = $state<RecordModel[]>([]);
	let isLoading = $state(false);
	let loadingOptions = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			locations = await pb.collection('seo_locations').getFullList({ sort: 'name' });
		} catch (err) {
			console.error('SEO locations options error:', err);
			error = 'Impossibile caricare i comuni esistenti.';
		} finally {
			loadingOptions = false;
		}
	});

	async function handleSubmit(values: Parameters<typeof seoLocationPayload>[0]) {
		isLoading = true;
		error = '';
		try {
			await pb.collection('seo_locations').create(seoLocationPayload(values));
			goto('/admin/seo/comuni');
		} catch (err) {
			console.error('SEO location create error:', err);
			error = err instanceof Error ? err.message : 'Creazione non riuscita.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head><title>Nuovo comune SEO | REI Admin</title></svelte:head>

<div class="max-w-4xl">
	<a href="/admin/seo/comuni" class="text-sm text-primary hover:underline">← Comuni SEO</a>
	<h1 class="mt-2 text-2xl font-bold">Nuovo comune SEO</h1>
	<p class="mt-1 text-sm text-muted-foreground">Crea l’entità geografica prima di abilitarne le pagine.</p>
	{#if error}<div class="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>{/if}
	<div class="mt-6">
		{#if loadingOptions}
			<div class="flex justify-center py-12"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
		{:else}
			<LocationForm {locations} onsubmit={handleSubmit} {isLoading} />
		{/if}
	</div>
</div>
