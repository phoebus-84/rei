<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import {
		buildPropertyImageMetadata,
		getSubmittedCoverImage,
		type PropertyImageSubmitOptions
	} from '$lib/utils';
	import { onMount } from 'svelte';
	import PropertyForm from '../PropertyForm.svelte';

	let property = $state<any>(null);
	let isLoading = $state(false);
	let error = $state('');
	let loadError = $state('');

	onMount(async () => {
		try {
			property = await pb.collection('properties').getOne(page.params.id!);
		} catch (err: any) {
			loadError = 'Immobile non trovato.';
			console.error('Load error:', err);
		}
	});

	async function handleSubmit(formData: FormData, options: PropertyImageSubmitOptions) {
		isLoading = true;
		error = '';
		try {
			const updated = await pb.collection('properties').update(page.params.id!, formData);
			const coverImage = getSubmittedCoverImage({
				record: updated,
				coverImage: options.coverImage,
				coverUploadId: options.coverUploadId,
				existingImageCountAfterRemoval: options.existingImageCountAfterRemoval,
				optimizedImages: options.optimizedImages
			});
			const imageMetadata = buildPropertyImageMetadata({
				record: updated,
				existingMetadata: property?.image_metadata,
				removedSourceFileNames: options.removedImages,
				existingImageCountAfterRemoval: options.existingImageCountAfterRemoval,
				optimizedImages: options.optimizedImages,
				seo: options.imageSeo
			});

			await pb.collection('properties').update(updated.id, {
				cover_image: coverImage,
				image_metadata: imageMetadata
			});

			goto('/admin/immobili');
		} catch (err: any) {
			error = err.message || "Errore durante l'aggiornamento.";
			console.error('Update error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>{property?.title ?? 'Modifica'} | REI Admin</title>
</svelte:head>

<div>
	{#if loadError}
		<div class="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
			{loadError}
		</div>
		<a href="/admin/immobili" class="mt-4 inline-block text-sm text-primary hover:underline"
			>← Torna alla lista</a
		>
	{:else if !property}
		<div class="flex justify-center py-12">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
			></div>
		</div>
	{:else}
		<h1 class="text-2xl font-bold text-foreground">Modifica immobile</h1>
		<p class="mt-1 text-sm text-muted-foreground">{property.title}</p>

		{#if error}
			<div class="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
				{error}
			</div>
		{/if}

		<div class="mt-6 max-w-3xl">
			<PropertyForm {property} onsubmit={handleSubmit} {isLoading} />
		</div>
	{/if}
</div>
