<script lang="ts">
	import PropertyCard from '$lib/components/listing/PropertyCard.svelte';
	import { currentUser, logout } from '$lib/stores/auth';
	import { getUserAvatarUrl } from '$lib/utils';
	import { LogOut, User, Mail, Phone } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
	$: savedProperties = data.savedProperties || [];

	function handleLogout() {
		logout();
		goto('/');
	}

	const userAvatar = user?.avatar ? getUserAvatarUrl(user.id, user.avatar) : null;
</script>

<svelte:head>
	<title>My Account | Paons Immobiliare</title>
	<meta name="description" content="Your Paons Immobiliare account dashboard" />
</svelte:head>

<main class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">My Account</h1>
			<p class="mt-2 text-gray-600">Manage your profile and saved properties</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-4">
			<!-- Sidebar: Profile -->
			<div class="lg:col-span-1">
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sticky top-8">
					<!-- Avatar -->
					<div class="mb-6 text-center">
						{#if userAvatar}
							<img src={userAvatar} alt={user.name} class="mx-auto mb-4 h-20 w-20 rounded-full" />
						{:else}
							<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
								<User size={32} class="text-gray-600" />
							</div>
						{/if}
						<h2 class="text-xl font-bold text-gray-900">{user.name}</h2>
						<p class="text-sm text-gray-600 capitalize">{user.type}</p>
					</div>

					<!-- Profile Info -->
					<div class="space-y-4 border-t border-gray-200 pt-6">
						{#if user.email}
							<div>
								<div class="flex items-center gap-2 text-sm text-gray-600 mb-1">
									<Mail size={16} />
									<span>Email</span>
								</div>
								<p class="text-sm text-gray-900 break-all">{user.email}</p>
							</div>
						{/if}

						{#if user.phone}
							<div>
								<div class="flex items-center gap-2 text-sm text-gray-600 mb-1">
									<Phone size={16} />
									<span>Phone</span>
								</div>
								<p class="text-sm text-gray-900">{user.phone}</p>
							</div>
						{/if}
					</div>

					<!-- Logout Button -->
					<button
						on:click={handleLogout}
						class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50"
					>
						<LogOut size={18} />
						Sign Out
					</button>
				</div>
			</div>

			<!-- Main Content: Saved Properties -->
			<div class="lg:col-span-3">
				<div>
					<h2 class="mb-6 text-2xl font-bold text-gray-900">Saved Properties</h2>

					{#if savedProperties.length > 0}
						<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{#each savedProperties as property (property.id)}
								<PropertyCard {property} />
							{/each}
						</div>
					{:else}
						<div class="rounded-lg border-2 border-dashed border-gray-300 bg-white py-12 text-center">
							<User size={48} class="mx-auto mb-4 text-gray-400" />
							<h3 class="text-lg font-medium text-gray-900">No saved properties yet</h3>
							<p class="mt-1 text-gray-600">
								Browse properties and click the heart icon to save them
							</p>
							<a
								href="/immobili"
								class="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white transition-all hover:bg-blue-600"
							>
								Browse Properties
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>
