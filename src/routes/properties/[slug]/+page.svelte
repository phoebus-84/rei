<script lang="ts">
	import ImageGallery from '$lib/components/detail/ImageGallery.svelte';
	import AgentContactForm from '$lib/components/detail/AgentContactForm.svelte';
	import { formatCurrency, formatArea } from '$lib/utils';
	import {
		Bed,
		Bath,
		Square,
		Wifi,
		Home,
		MapPin,
		Calendar,
		DoorOpen
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { property, agent } = data;

	// Format amenities
	const amenities = Array.isArray(property.amenities) ? property.amenities : [];

	// Status badge
	const statusInfo: Record<string, { label: string; color: string }> = {
		for_sale: { label: 'For Sale', color: 'bg-emerald-100 text-emerald-800' },
		for_rent: { label: 'For Rent', color: 'bg-blue-100 text-blue-800' },
		sold: { label: 'Sold', color: 'bg-gray-100 text-gray-800' },
		rented: { label: 'Rented', color: 'bg-slate-100 text-slate-800' }
	};

	const statusBadge = statusInfo[property.status] || statusInfo.for_sale;
	const propertyTypeLabel = property.property_type
		?.replace(/_/g, ' ')
		.replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Property';
</script>

<svelte:head>
	<title>{property.title} | Paons Immobiliare</title>
	<meta name="description" content={property.description || property.title} />
	<meta property="og:title" content={property.title} />
	<meta property="og:description" content={property.description || ''} />
	{#if property.images?.[0]}
		<meta
			property="og:image"
			content="https://paons-immobiliare.com/api/files/properties/{property.id}/{property.images[0]}"
		/>
	{/if}
	<meta property="og:type" content="website" />
</svelte:head>

<main class="bg-gray-50">
	<!-- Image Gallery -->
	<ImageGallery {property} />

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-8">
				<!-- Header -->
				<div>
					<div class="flex flex-wrap items-center gap-3 mb-4">
						<h1 class="text-3xl font-bold text-gray-900">{property.title}</h1>
						<span class={`rounded-full px-3 py-1 text-sm font-medium ${statusBadge.color}`}>
							{statusBadge.label}
						</span>
					</div>

					<div class="flex items-center gap-2 text-gray-600 mb-4">
						<MapPin size={18} />
						<span>{property.address}, {property.city}</span>
					</div>

					<div class="text-3xl font-bold text-gray-900">
						{formatCurrency(property.price)}
					</div>
				</div>

				<!-- Quick Stats -->
				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 border-y border-gray-200 py-6">
					{#if property.bedrooms}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Bed size={28} class="text-blue-600" />
							</div>
							<div class="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
							<div class="text-sm text-gray-600">Bedroom{property.bedrooms !== 1 ? 's' : ''}</div>
						</div>
					{/if}

					{#if property.bathrooms}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Bath size={28} class="text-blue-600" />
							</div>
							<div class="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
							<div class="text-sm text-gray-600">Bathroom{property.bathrooms !== 1 ? 's' : ''}</div>
						</div>
					{/if}

					{#if property.area_sqm}
						<div class="text-center">
							<div class="flex justify-center mb-2">
								<Square size={28} class="text-blue-600" />
							</div>
							<div class="text-2xl font-bold text-gray-900">{property.area_sqm}</div>
							<div class="text-sm text-gray-600">m²</div>
						</div>
					{/if}

					<div class="text-center">
						<div class="flex justify-center mb-2">
							<Home size={28} class="text-blue-600" />
						</div>
						<div class="text-2xl font-bold text-gray-900 capitalize">{propertyTypeLabel}</div>
						<div class="text-sm text-gray-600">Type</div>
					</div>
				</div>

				<!-- Description -->
				{#if property.description}
					<div>
						<h2 class="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
						<div class="prose prose-sm max-w-none text-gray-700">
							{property.description}
						</div>
					</div>
				{/if}

				<!-- Amenities -->
				{#if amenities.length > 0}
					<div>
						<h2 class="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{#each amenities as amenity}
								<div class="flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-4 py-3">
									<Wifi size={20} class="text-blue-600 flex-shrink-0" />
									<span class="text-sm font-medium text-gray-900">{amenity}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Property Details -->
				<div>
					<h2 class="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#if property.property_type}
							<div class="flex items-start gap-3">
								<DoorOpen size={20} class="mt-1 text-gray-600" />
								<div>
									<div class="text-sm font-medium text-gray-600">Property Type</div>
									<div class="text-gray-900 capitalize">{property.property_type}</div>
								</div>
							</div>
						{/if}

						{#if property.area_sqm}
							<div class="flex items-start gap-3">
								<Square size={20} class="mt-1 text-gray-600" />
								<div>
									<div class="text-sm font-medium text-gray-600">Total Area</div>
									<div class="text-gray-900">{formatArea(property.area_sqm)}</div>
								</div>
							</div>
						{/if}

						{#if property.created_at}
							<div class="flex items-start gap-3">
								<Calendar size={20} class="mt-1 text-gray-600" />
								<div>
									<div class="text-sm font-medium text-gray-600">Listed</div>
									<div class="text-gray-900">
										{new Date(property.created_at).toLocaleDateString('en-IE', {
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
								<Home size={20} class="mt-1 text-gray-600" />
								<div>
									<div class="text-sm font-medium text-gray-600">Status</div>
									<div class="text-gray-900 capitalize">{property.status.replace(/_/g, ' ')}</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<AgentContactForm {property} {agent} />
			</div>
		</div>
	</div>
</main>
