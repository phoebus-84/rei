<script lang="ts">
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	import PropertyCard from '$lib/components/listing/PropertyCard.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	let properties: RecordModel[] = [];
	let currentIndex = 0;
	let loading = true;
	let error = '';

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
			error = 'Failed to load featured properties';
		} finally {
			loading = false;
		}
	});

	function nextSlide() {
		currentIndex = (currentIndex + 1) % Math.max(1, properties.length - 2);
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + Math.max(1, properties.length - 2)) % Math.max(1, properties.length - 2);
	}

	// Auto-rotate carousel every 5 seconds
	onMount(() => {
		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	});
</script>

<section class="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Properties</h2>
			<p class="mt-4 text-lg text-gray-600">
				Discover our hand-picked selection of premium properties
			</p>
		</div>

		{#if loading}
			<div class="flex justify-center py-12">
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
			</div>
		{:else if error}
			<div class="rounded-lg bg-red-50 border border-red-200 p-4 text-center text-red-700">
				{error}
			</div>
		{:else if properties.length === 0}
			<div class="rounded-lg bg-gray-50 border border-gray-200 p-8 text-center text-gray-600">
				<p>No featured properties available yet</p>
			</div>
		{:else}
			<!-- Carousel -->
			<div class="relative">
				<!-- Cards Grid -->
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
					{#each properties.slice(currentIndex, currentIndex + 3) as property (property.id)}
						<div class="animate-fadeIn">
							<PropertyCard {property} />
						</div>
					{/each}
				</div>

				<!-- Navigation Buttons -->
				{#if properties.length > 3}
					<button
						on:click={prevSlide}
						class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-all"
						aria-label="Previous properties"
					>
						<ChevronLeft size={24} />
					</button>

					<button
						on:click={nextSlide}
						class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-all"
						aria-label="Next properties"
					>
						<ChevronRight size={24} />
					</button>
				{/if}

				<!-- Dots Indicator -->
				<div class="mt-8 flex justify-center gap-2">
					{#each Array.from({ length: Math.max(1, properties.length - 2) }) as _, idx}
						<button
							on:click={() => (currentIndex = idx)}
							class={`h-3 w-3 rounded-full transition-all ${
								idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
							}`}
							aria-label="Go to slide {idx + 1}"
							aria-current={idx === currentIndex}
						/>
					{/each}
				</div>
			</div>

			<!-- CTA -->
			<div class="mt-12 text-center">
				<a
					href="/properties"
					class="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-all"
				>
					Browse All Properties
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.5s ease-in-out;
	}
</style>
