<script lang="ts">
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import PropertyCard from '$lib/components/listing/PropertyCard.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';
	import { scrollReveal } from '$lib/utils/scroll-reveal';

	let properties: RecordModel[] = [];
	let currentPage = 0;
	let loading = true;
	let error = '';
	let paused = false;

	$: pageCount = Math.max(1, Math.ceil(properties.length / 3));
	$: visibleProperties = properties.slice(currentPage * 3, currentPage * 3 + 3);

	onMount(async () => {
		try {
			const result = await pb.collection('properties').getList(1, 8, {
				filter: 'featured = true && status != "empty"',
				sort: '-created',
				expand: 'agent'
			});
			properties = result.items;
		} catch (err) {
			console.error('Failed to load featured properties:', err);
			error = 'Impossibile caricare gli immobili in evidenza';
		} finally {
			loading = false;
		}
	});

	function nextSlide() {
		currentPage = (currentPage + 1) % pageCount;
	}

	function prevSlide() {
		currentPage = (currentPage - 1 + pageCount) % pageCount;
	}

	// Auto-rotate carousel every 5 seconds, pause on hover/focus
	onMount(() => {
		const interval = setInterval(() => {
			if (!paused) nextSlide();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<section class="bg-muted/30 py-16 sm:py-24 featured-section">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h2
				class="scroll-reveal-up font-display text-fluid-sub font-bold text-foreground"
				use:scrollReveal={{ delay: 0 }}
			>Immobili in Evidenza</h2>
			<p
				class="scroll-reveal-up mt-4 text-lg text-muted-foreground"
				use:scrollReveal={{ delay: 100 }}
			>
				Scopri la nostra selezione esclusiva di immobili premium
			</p>
		</div>

		{#if loading}
			<div class="flex justify-center py-12">
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
			</div>
		{:else if error}
			<div class="rounded-lg bg-red-50 border border-red-200 p-4 text-center text-red-700">
				{error}
			</div>
		{:else if properties.length === 0}
			<div class="rounded-lg bg-muted border border-border p-12 text-center">
				<p class="text-lg font-medium text-foreground">Nessun immobile in evidenza al momento</p>
				<p class="mt-2 text-muted-foreground">Stiamo aggiornando la nostra selezione. Torna presto!</p>
				<a
					href="/immobili"
					class="mt-6 inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
				>
					Sfoglia tutti gli immobili
				</a>
			</div>
		{:else}
			<!-- Carousel -->
			<div
				class="relative"
				on:mouseenter={() => (paused = true)}
				on:mouseleave={() => (paused = false)}
				on:focusin={() => (paused = true)}
				on:focusout={() => (paused = false)}
				role="region"
				aria-label="Carosello immobili in evidenza"
			>
				<!-- Cards Grid -->
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
					{#each visibleProperties as property (currentPage + '-' + property.id)}
						<div class="carousel-card-enter property-ken-burns">
							<PropertyCard {property} />
						</div>
					{/each}
				</div>

				<!-- Navigation Buttons -->
				{#if pageCount > 1}
					<button
						on:click={prevSlide}
						class="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 border border-border p-2 text-foreground shadow-md backdrop-blur hover:bg-muted transition-all"
						aria-label="Immobili precedenti"
					>
						<ChevronLeft size={24} />
					</button>

					<button
						on:click={nextSlide}
						class="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 border border-border p-2 text-foreground shadow-md backdrop-blur hover:bg-muted transition-all"
						aria-label="Immobili successivi"
					>
						<ChevronRight size={24} />
					</button>
				{/if}

				<!-- Dots Indicator -->
				<div class="mt-8 flex justify-center gap-3">
					{#each Array.from({ length: pageCount }) as _, idx}
						<button
							on:click={() => (currentPage = idx)}
							class={`h-3 rounded-full transition-all ${
								idx === currentPage ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-3'
							}`}
							aria-label="Vai alla pagina {idx + 1}"
							aria-current={idx === currentPage}
						></button>
					{/each}
				</div>
			</div>

			<!-- CTA -->
			<div
				class="scroll-reveal-up mt-12 text-center"
				use:scrollReveal={{ delay: 300 }}
			>
				<a
					href="/immobili"
					class="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
				>
					Visualizza tutti gli immobili
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Allow browser to skip rendering when section is off-screen */
	.featured-section {
		content-visibility: auto;
		contain-intrinsic-size: auto 600px;
	}

	/* Ken Burns: gentle zoom on property card images */
	.property-ken-burns :global(img) {
		animation: kenBurns 18s ease-in-out infinite alternate;
	}

	@media (prefers-reduced-motion: reduce) {
		.property-ken-burns :global(img) {
			animation: none;
		}
	}
</style>
