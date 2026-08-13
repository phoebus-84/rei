<script lang="ts">
	import { page } from '$app/state';
	import { trackEvent } from '$lib/analytics';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MarketData from '$lib/components/seo/MarketData.svelte';
	import NearbyLocations from '$lib/components/seo/NearbyLocations.svelte';
	import RichText from '$lib/components/seo/RichText.svelte';
	import FilterSidebar from '$lib/components/listing/FilterSidebar.svelte';
	import PropertyCard from '$lib/components/listing/PropertyCard.svelte';
	import ValuationExperience from '$lib/components/valuation/ValuationExperience.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { ArrowRight, Bell, ChevronLeft, ChevronRight, Search } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let filterOpen = $state(false);

	const hubLabel = $derived(data.definition.hubTitle.replace(' nel Canavese', ''));
	const breadcrumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: hubLabel, href: `/${data.seoPage.intent}` },
		{ label: data.seoPage.location.name }
	]);
	const analyticsDimensions = $derived({
		location: data.seoPage.location.slug,
		intent: data.seoPage.intent
	});
	// svelte-ignore state_referenced_locally
	const breadcrumbJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			item: item.href ? `${page.url.origin}${item.href}` : data.metadata.canonical
		}))
	}).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
	<meta name="robots" content={data.metadata.robots} />
	<link rel="canonical" href={data.metadata.canonical} />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:url" content={data.metadata.canonical} />
	<meta property="og:type" content="website" />
</svelte:head>

<JsonLd value={breadcrumbJsonLd} />

<main class="bg-background">
	<header class="relative overflow-hidden border-b border-border bg-card">
		<div class="absolute inset-y-0 right-0 hidden w-[38%] bg-primary/[0.045] lg:block" aria-hidden="true"></div>
		<div class="container relative py-8 sm:py-12 lg:py-16">
			<Breadcrumbs items={breadcrumbs} />
			<div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
				<div class="max-w-4xl">
					<p class="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
						{data.seoPage.location.province} · {data.seoPage.location.region}
					</p>
					<h1 class="font-display text-fluid-section font-bold tracking-tight text-foreground">
						{data.copy.h1}
					</h1>
					<p class="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{data.copy.intro}</p>
				</div>
				<div class="border-l-2 border-brand-terracotta pl-5">
					<p class="text-sm font-semibold text-foreground">Competenza locale, dati in chiaro.</p>
					<p class="mt-2 text-sm leading-6 text-muted-foreground">
						REI segue immobili a {data.seoPage.location.name} e nel Canavese.
					</p>
				</div>
			</div>
		</div>
	</header>

	{#if data.kind === 'inventory'}
		<section class="border-b border-border" aria-labelledby="inventory-heading">
			<div class="flex min-h-[36rem] lg:gap-0">
				<FilterSidebar
					bind:isOpen={filterOpen}
					defaultKeyword={data.seoPage.location.name}
					defaultStatus={data.definition.contract ?? 'for_sale'}
					hideStatusToggle
				/>

				<div class="min-w-0 flex-1 px-4 py-10 sm:px-6 lg:px-8">
					<div class="mx-auto max-w-7xl">
						<div class="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
							<div>
								<p class="text-sm font-semibold text-primary">Disponibilità aggiornata</p>
								<h2 id="inventory-heading" class="mt-2 font-display text-2xl font-bold tracking-tight">
									{data.inventory.totalItems} {data.definition.inventoryLabel} a {data.seoPage.location.name}
								</h2>
							</div>
							<form method="GET" class="flex items-center gap-2">
								<label for="seo-sort" class="text-sm text-muted-foreground">Ordina</label>
								<select id="seo-sort" name="sort" onchange={(event) => event.currentTarget.form?.submit()} class="rounded-md border border-input bg-background px-3 py-2 text-sm">
									<option value="">Più recenti</option>
									<option value="price" selected={page.url.searchParams.get('sort') === 'price'}>Prezzo crescente</option>
									<option value="-price" selected={page.url.searchParams.get('sort') === '-price'}>Prezzo decrescente</option>
								</select>
							</form>
						</div>

						{#if data.inventory.properties.length > 0}
							<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{#each data.inventory.properties as property (property.id)}
									<PropertyCard {property} />
								{/each}
							</div>

							{#if data.inventory.totalPages > 1}
								<nav class="mt-12 flex items-center justify-center gap-3" aria-label="Paginazione immobili">
									{#if data.inventory.currentPage > 1}
										<a href={`?page=${data.inventory.currentPage - 1}`} class="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted">
											<ChevronLeft class="h-4 w-4" /> Precedente
										</a>
									{/if}
									<span class="px-3 text-sm text-muted-foreground">Pagina {data.inventory.currentPage} di {data.inventory.totalPages}</span>
									{#if data.inventory.currentPage < data.inventory.totalPages}
										<a href={`?page=${data.inventory.currentPage + 1}`} class="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-semibold hover:bg-muted">
											Successiva <ChevronRight class="h-4 w-4" />
										</a>
									{/if}
								</nav>
							{/if}
						{:else}
							<div class="border-y border-border py-12">
								<div class="max-w-2xl">
									<Search class="h-7 w-7 text-primary" />
									<h2 class="mt-5 font-display text-2xl font-bold">Nessuna corrispondenza esatta oggi</h2>
									<p class="mt-3 leading-7 text-muted-foreground">
										Al momento non risultano immobili disponibili esattamente a {data.seoPage.location.name}. Puoi modificare i filtri oppure lasciarci i tuoi criteri: ti avviseremo quando entra una proposta coerente.
									</p>
									<a href="mailto:info@reicasa.it?subject=Ricerca%20immobile" onclick={() => trackEvent('seo_contact_clicked', analyticsDimensions)} class={`${buttonVariants({ variant: 'default' })} mt-6`}>
										<Bell class="mr-2 h-4 w-4" /> Segnala cosa stai cercando
									</a>
								</div>
							</div>

							{#if data.inventory.fallbackProperties.length > 0}
								<div class="mt-12">
									<h2 class="font-display text-2xl font-bold">Proposte disponibili nei comuni vicini</h2>
									<div class="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
										{#each data.inventory.fallbackProperties as property (property.id)}
											<PropertyCard {property} />
										{/each}
									</div>
								</div>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		</section>

		<section class="bg-primary text-primary-foreground">
			<div class="container grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center">
				<div>
					<h2 class="font-display text-2xl font-bold">Devi vendere un immobile a {data.seoPage.location.name}?</h2>
					<p class="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/80">Parti da una stima orientativa basata sul comune e sulle caratteristiche reali della proprietà.</p>
				</div>
				<a href={`/valutazione-casa/${data.seoPage.location.slug}`} class={buttonVariants({ variant: 'secondary', size: 'lg' })}>Valuta la tua casa <ArrowRight class="ml-2 h-4 w-4" /></a>
			</div>
		</section>
	{:else}
		<section aria-label="Valutazione automatica">
			<ValuationExperience
				initialLocation={data.initialLocation}
				showIntro={false}
				onStarted={() => trackEvent('seo_valuation_started', analyticsDimensions)}
				onCompleted={() => trackEvent('seo_valuation_completed', analyticsDimensions)}
			/>
		</section>
	{/if}

	{#if data.market}
		<MarketData market={data.market} intent={data.seoPage.intent} />
	{/if}

	{#if data.copy.content}
		<section class="container py-14 sm:py-20">
			<RichText html={data.copy.content} class="max-w-3xl" />
		</section>
	{/if}

	{#if data.kind === 'valuation'}
		<section class="container py-14 sm:py-20">
			<div class="grid gap-8 bg-brand-terracotta/10 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
				<div>
					<h2 class="font-display text-2xl font-bold">La stima automatica è un punto di partenza.</h2>
					<p class="mt-3 max-w-2xl leading-7 text-muted-foreground">Per definire il prezzo corretto servono sopralluogo, documenti e confronto con il mercato reale. REI può approfondire la valutazione a {data.seoPage.location.name}.</p>
				</div>
				<a href="tel:+390125282335" onclick={() => trackEvent('seo_contact_clicked', analyticsDimensions)} class={buttonVariants({ variant: 'default', size: 'lg' })}>Parla con REI</a>
			</div>
		</section>
	{/if}

	<NearbyLocations
		links={data.nearbyLinks}
		title={`Altri comuni per ${hubLabel.toLowerCase()}`}
		location={data.seoPage.location.slug}
		intent={data.seoPage.intent}
	/>
</main>
