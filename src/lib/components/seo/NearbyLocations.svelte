<script lang="ts">
	import { trackEvent } from '$lib/analytics';
	import type { SeoIntent, SeoLink } from '$lib/seo/types';
	import { ArrowUpRight } from 'lucide-svelte';

	let {
		links,
		title,
		location,
		intent
	}: { links: SeoLink[]; title: string; location: string; intent: SeoIntent } = $props();
</script>

{#if links.length > 0}
	<section class="container py-14 sm:py-20" aria-labelledby="nearby-locations-title">
		<div class="grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(14rem,0.7fr)_1.3fr]">
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Esplora la zona</p>
				<h2 id="nearby-locations-title" class="mt-3 font-display text-2xl font-bold tracking-tight">
					{title}
				</h2>
			</div>
			<ul class="grid gap-3 sm:grid-cols-2">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							onclick={() => trackEvent('seo_nearby_location_clicked', { location, intent })}
							class="group flex min-h-14 items-center justify-between border-b border-border px-1 py-3 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
						>
							{link.name}
							<ArrowUpRight class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
