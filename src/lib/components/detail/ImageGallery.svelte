<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { getPropertyImageUrl, getPropertyThumbnailUrl } from '$lib/utils';
	import { ChevronLeft, ChevronRight, X, Maximize } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	export let property: RecordModel;

	let lightboxOpen = false;
	let lightboxIndex = 0;
	let imageLoaded = false;
	let thumbnailStrip: HTMLDivElement;

	const images = property.images || [];

	$: lightboxIndex, imageLoaded = false;

	function scrollThumbnailIntoView() {
		if (!thumbnailStrip) return;
		const active = thumbnailStrip.querySelector('[data-active="true"]') as HTMLElement;
		if (!active) return;
		const stripRect = thumbnailStrip.getBoundingClientRect();
		const thumbRect = active.getBoundingClientRect();
		const offset = thumbRect.left - stripRect.left - (stripRect.width / 2) + (thumbRect.width / 2);
		thumbnailStrip.scrollBy({ left: offset, behavior: 'smooth' });
	}

	afterUpdate(() => {
		if (lightboxOpen) scrollThumbnailIntoView();
	});

	function jumpToImage(index: number) {
		lightboxIndex = index;
	}

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

	// Touch/swipe support
	let touchStartX = 0;
	let touchStartY = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		const dx = e.changedTouches[0].clientX - touchStartX;
		const dy = e.changedTouches[0].clientY - touchStartY;
		// Only trigger if horizontal swipe > 50px and more horizontal than vertical
		if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
			if (dx < 0) nextImage();
			else prevImage();
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		// Only close if the click is directly on the backdrop itself
		if (e.target === e.currentTarget) closeLightbox();
	}

	function handleImageError(e: Event) {
		const img = e.target as HTMLImageElement;
		img.style.display = 'none';
		const placeholder = document.createElement('div');
		placeholder.className = 'flex items-center justify-center w-full h-full text-muted-foreground bg-muted text-sm';
		placeholder.textContent = 'Immagine non disponibile';
		img.parentElement?.appendChild(placeholder);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- Main Image Grid -->
<div class="mb-8 rounded-xl overflow-hidden bg-muted">
	{#if images.length === 0}
		<div class="aspect-video flex items-center justify-center bg-muted">
			<span class="text-muted-foreground">Nessuna immagine disponibile</span>
		</div>
	{:else if images.length === 1}
		<!-- Single Image -->
		<button
			on:click={() => openLightbox(0)}
			class="group relative w-full block cursor-pointer transition-opacity"
		>
			<img
				src={getPropertyImageUrl(property.id, images[0])}
				alt="Immobile"
				class="w-full h-[500px] object-cover"
				on:error={handleImageError}
			/>
			<div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
				<div class="rounded-full bg-white/80 p-3 opacity-0 transition-opacity group-hover:opacity-100">
					<Maximize size={20} class="text-foreground" />
				</div>
			</div>
		</button>
	{:else}
		<!-- Grid Layout: responsive -->
		<!-- Mobile: single hero image + "see all" button -->
		<div class="sm:hidden relative">
			<button
				on:click={() => openLightbox(0)}
				class="group relative w-full cursor-pointer"
			>
				<img
					src={getPropertyImageUrl(property.id, images[0])}
					alt="Vista principale immobile"
					class="w-full h-[300px] object-cover"
					on:error={handleImageError}
				/>
				<div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
					<div class="rounded-full bg-white/80 p-3 opacity-0 transition-opacity group-hover:opacity-100">
						<Maximize size={20} class="text-foreground" />
					</div>
				</div>
			</button>
			{#if images.length > 1}
				<button
					on:click={() => openLightbox(0)}
					class="absolute bottom-3 right-3 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
				>
					Vedi tutte le foto ({images.length})
				</button>
			{/if}
		</div>

		<!-- Desktop: 4-col grid -->
		<div class="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 h-[500px]">
			<!-- Main Image: 2x2 (left side) -->
			<button
				on:click={() => openLightbox(0)}
				class="group relative col-span-2 row-span-2 rounded-l-xl overflow-hidden cursor-pointer"
			>
				<img
					src={getPropertyImageUrl(property.id, images[0])}
					alt="Vista principale immobile"
					class="w-full h-full object-cover"
					on:error={handleImageError}
				/>
				<div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
					<div class="rounded-full bg-white/80 p-3 opacity-0 transition-opacity group-hover:opacity-100">
						<Maximize size={24} class="text-foreground" />
					</div>
				</div>
			</button>

			<!-- Secondary Images: 1x1 each (right side) -->
			{#each images.slice(1, 4) as image, idx}
				<button
					on:click={() => openLightbox(idx + 1)}
					class={`group relative cursor-pointer overflow-hidden ${
						idx === 2 ? 'rounded-r-xl' : ''
					}`}
				>
					<img
						src={getPropertyImageUrl(property.id, image)}
						alt="Vista immobile {idx + 2}"
						class="w-full h-full object-cover"
						on:error={handleImageError}
					/>
					<!-- Hover affordance -->
					{#if !(idx === 2 && images.length > 4)}
						<div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
							<div class="rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
								<Maximize size={16} class="text-foreground" />
							</div>
						</div>
					{/if}

					<!-- +N more overlay on last image -->
					{#if idx === 2 && images.length > 4}
						<div
							class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-r-xl"
						>
							<span class="text-white text-2xl font-bold">
								+{images.length - 4} altri
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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black"
		on:click={handleBackdropClick}
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchEnd}
		role="dialog"
		aria-modal="true"
		aria-label="Image gallery lightbox"
		tabindex="-1"
	>
		<!-- Close Button -->
		<button
			on:click={closeLightbox}
			class="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
			aria-label="Chiudi lightbox"
		>
			<X size={24} class="text-white" />
		</button>

		<!-- Main Image -->
		<div class="relative w-full h-full flex items-center justify-center px-4">
			<!-- Loading spinner -->
			{#if !imageLoaded}
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="lightbox-spinner"></div>
				</div>
			{/if}

			{#key lightboxIndex}
				<img
					src={getPropertyImageUrl(property.id, images[lightboxIndex])}
					alt="Vista immobile {lightboxIndex + 1}"
					class="max-w-full max-h-full object-contain transition-opacity duration-300"
					class:opacity-0={!imageLoaded}
					class:opacity-100={imageLoaded}
					on:load={() => (imageLoaded = true)}
					on:error={(e) => { imageLoaded = true; handleImageError(e); }}
				/>
			{/key}

			<!-- Navigation Buttons -->
			{#if images.length > 1}
				<button
					on:click|stopPropagation={prevImage}
					class="absolute left-2 sm:left-4 rounded-full bg-white/20 p-3 hover:bg-white/30 transition-colors"
					aria-label="Immagine precedente"
				>
					<ChevronLeft size={28} class="text-white" />
				</button>

				<button
					on:click|stopPropagation={nextImage}
					class="absolute right-2 sm:right-4 rounded-full bg-white/20 p-3 hover:bg-white/30 transition-colors"
					aria-label="Immagine successiva"
				>
					<ChevronRight size={28} class="text-white" />
				</button>
			{/if}
		</div>

		<!-- Thumbnail Strip -->
		{#if images.length > 1}
			<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
			<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-4 px-4" on:click|stopPropagation>
				<div
					class="thumbnail-strip flex gap-2 overflow-x-auto mx-auto max-w-2xl justify-center"
					bind:this={thumbnailStrip}
				>
					{#each images as image, idx}
						<button
							on:click={() => jumpToImage(idx)}
							data-active={idx === lightboxIndex}
							class="thumbnail-item flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
							class:border-white={idx === lightboxIndex}
							class:opacity-100={idx === lightboxIndex}
							class:border-transparent={idx !== lightboxIndex}
							class:opacity-50={idx !== lightboxIndex}
							class:hover:opacity-80={idx !== lightboxIndex}
							aria-label="Vai all'immagine {idx + 1}"
							aria-current={idx === lightboxIndex ? 'true' : undefined}
						>
							<img
								src={getPropertyThumbnailUrl(property.id, image)}
								alt="Miniatura {idx + 1}"
								class="w-full h-full object-cover"
								loading="lazy"
							/>
						</button>
					{/each}
				</div>
				<div class="text-center text-white/60 text-xs mt-2">
					{lightboxIndex + 1} / {images.length}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	:global(body.lightbox-open) {
		overflow: hidden;
	}

	.lightbox-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.2);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.thumbnail-strip {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.thumbnail-strip::-webkit-scrollbar {
		display: none;
	}

	.thumbnail-item {
		transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
	}

	.thumbnail-item[data-active='true'] {
		transform: scale(1.1);
	}
</style>
