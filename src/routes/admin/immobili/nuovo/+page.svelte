<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import {
		buildPropertyImageMetadata,
		getSubmittedCoverImage,
		type PropertyImageSubmitOptions
	} from '$lib/utils';
	import PropertyForm from '../PropertyForm.svelte';

	let isLoading = $state(false);
	let error = $state('');

	async function handleSubmit(formData: FormData, options: PropertyImageSubmitOptions) {
		isLoading = true;
		error = '';
		try {
			const created = await pb.collection('properties').create(formData);
			const coverImage = getSubmittedCoverImage({
				record: created,
				coverImage: options.coverImage,
				coverUploadId: options.coverUploadId,
				existingImageCountAfterRemoval: options.existingImageCountAfterRemoval,
				optimizedImages: options.optimizedImages
			});
			const imageMetadata = buildPropertyImageMetadata({
				record: created,
				existingMetadata: [],
				removedSourceFileNames: [],
				existingImageCountAfterRemoval: 0,
				optimizedImages: options.optimizedImages,
				seo: options.imageSeo
			});

			if (coverImage || imageMetadata.length > 0) {
				await pb.collection('properties').update(created.id, {
					cover_image: coverImage,
					image_metadata: imageMetadata
				});
			}

			goto('/admin/immobili');
		} catch (err: any) {
			error = err.message || 'Errore durante la creazione.';
			console.error('Create error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Nuovo immobile | REI Admin</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-foreground">Nuovo immobile</h1>
	<p class="mt-1 text-sm text-muted-foreground">Aggiungi un nuovo immobile al catalogo</p>

	{#if error}
		<div class="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
			{error}
		</div>
	{/if}

	<div class="mt-6 max-w-3xl">
		<PropertyForm onsubmit={handleSubmit} {isLoading} />
	</div>
</div>
