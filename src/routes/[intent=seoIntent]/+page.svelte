<script lang="ts">
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import { ArrowUpRight, Home, KeyRound, LineChart } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const icons = {
		'case-in-vendita': Home,
		'case-in-affitto': KeyRound,
		'valutazione-casa': LineChart
	};
	const IntentIcon = $derived(icons[data.intent]);
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={data.metadata.canonical} />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:url" content={data.metadata.canonical} />
</svelte:head>

<main>
	<header class="border-b border-border bg-card">
		<div class="container py-10 sm:py-16 lg:py-20">
			<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: data.definition.hubTitle }]} />
			<div class="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
				<div class="max-w-4xl">
					<p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
						<IntentIcon class="h-4 w-4" /> {data.definition.hubEyebrow}
					</p>
					<h1 class="mt-5 font-display text-fluid-section font-bold tracking-tight">
						{data.definition.hubTitle}
					</h1>
					<p class="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
						{data.definition.hubDescription}
					</p>
				</div>
				<p class="border-l-2 border-brand-terracotta pl-5 text-sm leading-6 text-muted-foreground">
					Mostriamo solo i comuni attivati e seguiti intenzionalmente da REI Casa.
				</p>
			</div>
		</div>
	</header>

	<section class="container py-14 sm:py-20" aria-labelledby="municipalities-title">
		<div class="grid gap-8 md:grid-cols-[minmax(14rem,0.55fr)_1.45fr]">
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Comuni disponibili</p>
				<h2 id="municipalities-title" class="mt-3 font-display text-2xl font-bold">
					Scegli la zona
				</h2>
			</div>

			{#if data.locations.length > 0}
				<ul class="grid gap-x-8 sm:grid-cols-2">
					{#each data.locations as location (location.slug)}
						<li>
							<a
								href={`/${data.intent}/${location.slug}`}
								class="group flex min-h-20 items-center justify-between border-b border-border py-4 text-lg font-semibold transition-colors hover:border-primary hover:text-primary"
							>
								<span>
									{location.name}
									<small class="ml-2 text-xs font-normal text-muted-foreground">{location.province}</small>
								</span>
								<ArrowUpRight class="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="border-y border-border py-8 leading-7 text-muted-foreground">
					Le pagine comunali per questo servizio sono in preparazione. Nel frattempo puoi usare i
					servizi generali di REI Casa.
				</p>
			{/if}
		</div>
	</section>
</main>
