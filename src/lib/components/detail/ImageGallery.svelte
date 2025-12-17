<script lang="ts">
	import { onMount } from 'svelte';
	import { getPropertyImageUrl } from '$lib/utils';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	export let property: RecordModel;

	let lightboxOpen = false;
	let lightboxIndex = 0;

	const images = property.images || [];

	function openLightbox(index: number) {
		lightboxIndex = index;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
	}

	function nextImage() {
		lightboxIndex = (lightboxIndex + 1) % images.length;
	}

	function prevImage() {
		lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'Escape') closeLightbox();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- Main Image Grid -->
<div class="mb-8 rounded-xl overflow-hidden bg-gray-200">
	{#if images.length === 0}
		<div class="aspect-video flex items-center justify-center bg-gray-300">
			<span class="text-gray-600">No images available</span>
		</div>
	{:else if images.length === 1}
		<!-- Single Image -->
		<button
			on:click={() => openLightbox(0)}
			class="w-full block cursor-pointer hover:opacity-90 transition-opacity"
		>
			<img
				src={getPropertyImageUrl(property.id, images[0])}
				alt="Property"
				class="w-full h-[500px] object-cover"
			/>
		</button>
	{:else}
		<!-- Grid Layout: 4 cols, 2 rows -->
		<div class="grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
			<!-- Main Image: 2x2 (left side) -->
			<button
				on:click={() => openLightbox(0)}
				class="col-span-2 row-span-2 rounded-l-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
			>
				<img
					src={getPropertyImageUrl(property.id, images[0])}
					alt="Main property view"
					class="w-full h-full object-cover"
				/>
			</button>

			<!-- Secondary Images: 1x1 each (right side) -->
			{#each images.slice(1, 4) as image, idx}
				<button
					on:click={() => openLightbox(idx + 1)}
					class={`relative cursor-pointer hover:opacity-90 transition-opacity overflow-hidden ${
						idx === 2 ? 'rounded-r-xl' : ''
					}`}
				>
					<img
						src={getPropertyImageUrl(property.id, image)}
						alt="Property view {idx + 2}"
						class="w-full h-full object-cover"
					/>

					<!-- +N more overlay on last image -->
					{#if idx === 2 && images.length > 4}
						<div
							class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-r-xl"
						>
							<span class="text-white text-2xl font-bold">
								+{images.length - 4} more
							</span>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<!-- Lightbox Modal -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black"
		on:click={closeLightbox}
		role="dialog"
		aria-modal="true"
		aria-label="Image gallery lightbox"
	>
		<!-- Close Button -->
		<button
			on:click={closeLightbox}
			class="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
			aria-label="Close lightbox"
		>
			<X size={24} class="text-white" />
		</button>

		<!-- Main Image -->
		<div class="relative w-full h-full flex items-center justify-center px-4">
			<img
				src={getPropertyImageUrl(property.id, images[lightboxIndex])}
				alt="Property view {lightboxIndex + 1}"
				class="max-w-full max-h-full object-contain"
			/>

			<!-- Navigation Buttons -->
			{#if images.length > 1}
				<button
					on:click|stopPropagation={prevImage}
					class="absolute left-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
					aria-label="Previous image"
				>
					<ChevronLeft size={32} class="text-white" />
				</button>

				<button
					on:click|stopPropagation={nextImage}
					class="absolute right-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
					aria-label="Next image"
				>
					<ChevronRight size={32} class="text-white" />
				</button>
			{/if}
		</div>

		<!-- Image Counter -->
		{#if images.length > 1}
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 rounded-full px-4 py-2 text-white">
				{lightboxIndex + 1} / {images.length}
			</div>
		{/if}
	</div>
{/if}

<style>
	:global(body.lightbox-open) {
		overflow: hidden;
	}
</style>
