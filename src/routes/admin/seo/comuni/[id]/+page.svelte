<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { seoLocationPayload } from '$lib/admin/seo';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import LocationForm from '../../LocationForm.svelte';

	let location = $state<RecordModel | null>(null);
	let locations = $state<RecordModel[]>([]);
	let loading = $state(true);
	let isLoading = $state(false);
	let error = $state('');

	onMount(async () => {
		try {
			[location, locations] = await Promise.all([
				pb.collection('seo_locations').getOne(page.params.id!),
				pb.collection('seo_locations').getFullList({ sort: 'name' })
			]);
		} catch (err) {
			console.error('SEO location load error:', err);
			error = 'Comune SEO non trovato.';
		} finally {
			loading = false;
		}
	});

	async function handleSubmit(values: Parameters<typeof seoLocationPayload>[0]) {
		isLoading = true;
		error = '';
		try {
			await pb.collection('seo_locations').update(page.params.id!, seoLocationPayload(values));
			goto('/admin/seo/comuni');
		} catch (err) {
			console.error('SEO location update error:', err);
			error = err instanceof Error ? err.message : 'Aggiornamento non riuscito.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head><title>{location?.name ?? 'Comune SEO'} | REI Admin</title></svelte:head>

<div class="max-w-4xl">
	<a href="/admin/seo/comuni" class="text-sm text-primary hover:underline">← Comuni SEO</a>
	<h1 class="mt-2 text-2xl font-bold">Modifica comune SEO</h1>
	<p class="mt-1 text-sm text-muted-foreground">{location?.name ?? 'Caricamento…'}</p>
	{#if error}<div class="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>{/if}
	<div class="mt-6">
		{#if loading}
			<div class="flex justify-center py-12"><div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>
		{:else if location}
			<LocationForm {location} {locations} onsubmit={handleSubmit} {isLoading} />
		{/if}
	</div>
</div>
