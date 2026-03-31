<script lang="ts">
	import ImageGallery from '$lib/components/detail/ImageGallery.svelte';
	import AgentContactForm from '$lib/components/detail/AgentContactForm.svelte';
	import { formatCurrency, formatArea } from '$lib/utils';
	import {
		Bed,
		Bath,
		Square,
		Check,
		Home,
		MapPin,
		Calendar,
		ChevronRight,
		Phone
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { property, agent } = data;

	// Format amenities
	const amenities = Array.isArray(property.amenities) ? property.amenities : [];

	// Status badge — using brand tokens
	const statusInfo: Record<string, { label: string; color: string }> = {
		for_sale: { label: 'In Vendita', color: 'bg-primary/10 text-primary' },
		for_rent: { label: 'In Affitto', color: 'bg-accent/10 text-accent' },
		sold: { label: 'Venduto', color: 'bg-muted text-muted-foreground' },
		rented: { label: 'Affittato', color: 'bg-muted text-muted-foreground' }
	};

	const statusBadge = statusInfo[property.status] || statusInfo.for_sale;
	const propertyTypeLabel = property.property_type
		?.replace(/_/g, ' ')
		.replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Immobile';

	// Italian status labels for details section
	const statusLabelIt: Record<string, string> = {
		for_sale: 'In Vendita',
		for_rent: 'In Affitto',
		sold: 'Venduto',
		rented: 'Affittato'
	};
</script>

<svelte:head>
	<title>{property.title} | REI Immobiliare</title>
	<meta name="description" content={property.description || property.title} />
	<meta property="og:title" content={property.title} />
	<meta property="og:description" content={property.description || ''} />
	{#if property.images?.[0]}
		<meta
			property="og:image"
			content="https://paons-immobiliare.com/api/files/properties/{property.id}/{property.images[0]}"
		/>
	{/if}
	<meta property="og:type" content="article" />
</svelte:head>

<main class="bg-background">
	<!-- Breadcrumb -->
	<div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
		<nav aria-label="Breadcrumb" class="flex items-center gap-1 text-sm text-muted-foreground">
			<a href="/immobili" class="transition-colors hover:text-foreground">Immobili</a>
			<ChevronRight size={14} />
			<span class="truncate text-foreground">{property.title}</span>
		</nav>
	</div>

	<!-- Image Gallery -->
	<ImageGallery {property} />

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-8">
				<!-- Header -->
				<div>
					<div class="flex flex-wrap items-center gap-3 mb-4">
						<h1 class="font-display text-fluid-sub tracking-tight text-foreground">{property.title}</h1>
						<span class={`rounded-full px-3 py-1 text-sm font-medium ${statusBadge.color}`}>
							{statusBadge.label}
						</span>
					</div>

					<div class="flex items-center gap-2 text-muted-foreground mb-4">
						<MapPin size={18} />
						<span>{property.address}, {property.city}</span>
					</div>

					<div class="font-display text-3xl font-bold text-accent">
						{formatCurrency(property.price)}
					</div>
				</div>

				<!-- Quick Stats -->
				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 border-y border-border py-6">
					{#if property.bedrooms}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Bed size={28} class="text-primary" />
							</div>
							<div class="font-display text-2xl font-bold tabular-nums text-foreground">{property.bedrooms}</div>
							<div class="text-sm text-muted-foreground">{property.bedrooms === 1 ? 'Camera da letto' : 'Camere da letto'}</div>
						</div>
					{/if}

					{#if property.bathrooms}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Bath size={28} class="text-primary" />
							</div>
							<div class="font-display text-2xl font-bold tabular-nums text-foreground">{property.bathrooms}</div>
							<div class="text-sm text-muted-foreground">{property.bathrooms === 1 ? 'Bagno' : 'Bagni'}</div>
						</div>
					{/if}

					{#if property.area_sqm}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Square size={28} class="text-primary" />
							</div>
							<div class="font-display text-2xl font-bold tabular-nums text-foreground">{property.area_sqm}</div>
							<div class="text-sm text-muted-foreground">m²</div>
						</div>
					{/if}

					<div class="text-center">
						<div class="flex justify-center mb-2">
							<Home size={28} class="text-primary" />
						</div>
						<div class="font-display text-2xl font-bold text-foreground capitalize">{propertyTypeLabel}</div>
						<div class="text-sm text-muted-foreground">Tipo</div>
					</div>
				</div>

				<!-- Description -->
				{#if property.description}
					<div>
						<h2 class="font-display text-xl font-bold text-foreground mb-4">Descrizione</h2>
						<div class="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
							{property.description}
						</div>
					</div>
				{/if}

				<!-- Amenities -->
				{#if amenities.length > 0}
					<div>
						<h2 class="font-display text-xl font-bold text-foreground mb-4">Servizi e Dotazioni</h2>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{#each amenities as amenity}
								<div class="flex items-center gap-3 rounded-lg bg-card border border-border px-4 py-3">
									<Check size={20} class="text-primary flex-shrink-0" />
									<span class="text-sm font-medium text-foreground">{amenity}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Property Details (only non-duplicate metadata) -->
				<div>
					<h2 class="font-display text-xl font-bold text-foreground mb-4">Dettagli</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#if property.created_at}
							<div class="flex items-start gap-3">
								<Calendar size={20} class="mt-1 text-muted-foreground" />
								<div>
									<div class="text-sm font-medium text-muted-foreground">Pubblicato il</div>
									<div class="text-foreground">
										{new Date(property.created_at).toLocaleDateString('it-IT', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</div>
								</div>
							</div>
						{/if}

						{#if property.status}
							<div class="flex items-start gap-3">
								<Home size={20} class="mt-1 text-muted-foreground" />
								<div>
									<div class="text-sm font-medium text-muted-foreground">Stato</div>
									<div class="text-foreground">{statusLabelIt[property.status] || property.status}</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:col-span-1" id="contact-form">
				<AgentContactForm {property} {agent} />
			</div>
		</div>
	</div>

	<!-- Floating contact button (mobile only) -->
	<div class="fixed bottom-6 left-4 right-4 z-40 lg:hidden">
		<a
			href="#contact-form"
			class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-[0.98]"
		>
			<Phone size={18} />
			Contatta l'agente
		</a>
	</div>
</main>
