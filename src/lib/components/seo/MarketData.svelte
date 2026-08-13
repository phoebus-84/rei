<script lang="ts">
	import { formatMarketCurrency } from '$lib/seo/domain';
	import type { SeoIntent, SeoMarketData } from '$lib/seo/types';
	import { BarChart3, Info } from 'lucide-svelte';

	let {
		market,
		intent
	}: {
		market: SeoMarketData;
		intent: SeoIntent;
	} = $props();

	const title = $derived(
		intent === 'case-in-affitto'
			? `Affitti a ${market.municipality}`
			: `Il mercato immobiliare a ${market.municipality}`
	);
</script>

<section class="border-y border-border bg-muted/35" aria-labelledby="local-market-title">
	<div class="container py-14 sm:py-16">
		<div class="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
			<div class="max-w-xl">
				<p class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
					<BarChart3 class="h-4 w-4" />
					Riferimenti locali
				</p>
				<h2 id="local-market-title" class="font-display text-fluid-sub font-bold tracking-tight">
					{title}
				</h2>
				<p class="mt-4 text-sm leading-6 text-muted-foreground">
					Valori medi indicativi al metro quadro del comune: sono riferimenti generali di mercato,
					non la valutazione di uno specifico immobile.
				</p>
			</div>

			<div class="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
				{#if market.salePricePerSqm !== null && intent !== 'case-in-affitto'}
					<div class="bg-card p-6 sm:p-7">
						<p class="text-sm font-medium text-muted-foreground">Riferimento medio di vendita</p>
						<p class="mt-3 font-display text-3xl font-bold tabular-nums text-foreground">
							{formatMarketCurrency(market.salePricePerSqm)}<span class="ml-1 font-sans text-sm font-medium text-muted-foreground">/m²</span>
						</p>
					</div>
				{/if}
				{#if market.rentPricePerSqm !== null && intent !== 'case-in-vendita'}
					<div class="bg-card p-6 sm:p-7">
						<p class="text-sm font-medium text-muted-foreground">Riferimento medio di affitto</p>
						<p class="mt-3 font-display text-3xl font-bold tabular-nums text-foreground">
							{formatMarketCurrency(market.rentPricePerSqm, 2)}<span class="ml-1 font-sans text-sm font-medium text-muted-foreground">/m² al mese</span>
						</p>
					</div>
				{/if}
				{#if market.exampleSaleValue100Sqm !== null && intent === 'case-in-vendita'}
					<div class="bg-card p-6 sm:p-7">
						<p class="text-sm font-medium text-muted-foreground">Esempio indicativo, 100 m²</p>
						<p class="mt-3 font-display text-3xl font-bold tabular-nums text-foreground">
							{formatMarketCurrency(market.exampleSaleValue100Sqm)}
						</p>
					</div>
				{/if}
				<div class="bg-card p-6 sm:p-7">
					<p class="text-sm font-medium text-muted-foreground">Periodo di riferimento</p>
					<p class="mt-3 text-lg font-semibold capitalize text-foreground">{market.referenceLabel}</p>
					<a
						href={market.sourceUrl}
						target="_blank"
						rel="noreferrer"
						class="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
					>
						Fonte: {market.sourceLabel}
					</a>
				</div>
			</div>
		</div>

		<p class="mt-6 flex max-w-3xl items-start gap-2 text-xs leading-5 text-muted-foreground">
			<Info class="mt-0.5 h-3.5 w-3.5 shrink-0" />
			I valori del Borsino costituiscono una base media territoriale. Stato, piano, esposizione,
			documentazione e caratteristiche dell’immobile possono modificare sensibilmente il valore.
		</p>
	</div>
</section>
